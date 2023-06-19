// directly stealing from twinqles donation board system

import { MarketplaceService, DataStoreService, Players } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";
import { Events } from "server/network";
import { DonationBoardData } from "shared/types/interfaces/donationBoardData";
import { donationOptions } from "shared/types/constants/donationOptions";

type UpdateBoardArgument = Player | "all";

const dataKey = "#&(DMD!)A!)@$";

@Service()
export class DonationBoard implements OnStart {
	// please dont keep this above 50
	displayAmount = 25;

	donations = DataStoreService.GetOrderedDataStore(`DONATIONS_${dataKey}`);

	nameCache: Record<number, string> = {};
	iconCache: Record<number, string> = {};

	findAmountById(id: number) {
		for (const donationInfo of donationOptions) if (donationInfo.id === id) return donationInfo.amount;

		warn(`couldnt find any donation amount for product id ${id}`);
		return 0;
	}

	processReceipt(receiptInfo: ReceiptInfo) {
		const donatedAmount = this.findAmountById(receiptInfo.ProductId);
		const playerId = receiptInfo.PlayerId;

		const [success, err] = pcall(() => {
			this.donations.UpdateAsync<number, number>(`playerid_${playerId}`, (previousData) => {
				if (previousData !== undefined) {
					return previousData + donatedAmount;
				} else {
					warn(`updating the value failed apparently`);
					return donatedAmount;
				}
			});
		});

		if (!success) {
			warn(`failed with warning: ${err}`);
			return Enum.ProductPurchaseDecision.NotProcessedYet;
		}
		return Enum.ProductPurchaseDecision.PurchaseGranted;
	}

	getName(id: number) {
		if (this.nameCache[id] !== undefined) return this.nameCache[id];

		const [success, result] = pcall(() => Players.GetNameFromUserIdAsync(id));

		if (success) {
			this.nameCache[id] = result;
			return result;
		}

		warn(`couldnt find username for id of ${id}`);
		return "N/A";
	}

	getIcon(id: number) {
		if (this.iconCache[id] !== undefined) return this.iconCache[id];

		const [thumbnailURL, didReturn] = Players.GetUserThumbnailAsync(
			id,
			Enum.ThumbnailType.HeadShot,
			Enum.ThumbnailSize.Size420x420,
		);
		if (didReturn) {
			this.iconCache[id] = thumbnailURL;
			return thumbnailURL;
		}

		warn(`couldnt load headshot thumbnail for id ${id}`);
		return "";
	}

	updateBoard(players: UpdateBoardArgument) {
		const sorted = this.donations.GetSortedAsync(false, this.displayAmount, 1);
		if (!sorted) return;

		const page = sorted.GetCurrentPage();
		const clientDataPacket: DonationBoardData[] = [];

		// this is like.. extremely stupid... but its the way roblox-ts is and you apparently cant get the length of page and do a numerical loop LIKE A NORMAL PERSON
		for (const [rank, data] of ipairs(page)) {
			const [result] = string.gsub(data.key, "playerid_", "");
			const userId = tonumber(result);
			if (userId === undefined) continue;

			const username = this.getName(userId);
			const icon = this.getIcon(userId);
			const amountDonated = data.value as number;

			clientDataPacket.push(
				identity<DonationBoardData>({
					name: username,
					icon: icon,
					amount: amountDonated,
					rank: rank,
				}),
			);
		}

		if (players === "all") {
			Events.donationBoardRefresh.broadcast(clientDataPacket);
		} else {
			Events.donationBoardRefresh.fire(players, clientDataPacket);
		}
	}

	onStart() {
		MarketplaceService.ProcessReceipt = (receiptInfo: ReceiptInfo) => this.processReceipt(receiptInfo);

		Players.PlayerAdded.Connect((player) => this.updateBoard(player));

		// this is literally just a while true loop I just have to appease eslint haha
		for (;;) {
			this.updateBoard("all");
			// task.wait(30);
			task.wait(10);
		}
	}
}
