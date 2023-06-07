// directly stealing from twinqles donation board system

import { MarketplaceService, DataStoreService, Players } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";
import { Events } from "server/network";
import { DonationBoardData } from "shared/types/interfaces/donationBoardData";
import { donationOptions } from "shared/types/constants/donationOptions";

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
				if (previousData) {
					return previousData + donatedAmount;
				} else {
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
		if (this.nameCache[id]) return this.nameCache[id];

		const [success, result] = pcall(() => Players.GetNameFromUserIdAsync(id));

		if (success) {
			this.nameCache[id] = result;
			return result;
		}

		warn(`couldnt find username for id of ${id}`);
		return "N/A";
	}

	getIcon(id: number) {
		if (this.iconCache[id]) return this.iconCache[id];

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

	updateBoard() {
		const sorted = this.donations.GetSortedAsync(false, this.displayAmount, 1);
		if (!sorted) return;

		const page = sorted.GetCurrentPage();
		const clientDataPacket: DonationBoardData[] = [];

		for (const [rank, data] of ipairs(page)) {
			const userId = tonumber(data.key);
			if (!userId) continue;

			const username = this.getName(userId);
			const icon = this.getIcon(userId);
			const amountDonated = data.value as number;

			clientDataPacket.push({
				name: username,
				icon: icon,
				amount: amountDonated,
				rank: rank,
			});
		}

		Events.donationBoardRefresh.broadcast(clientDataPacket);
	}

	onStart() {
		MarketplaceService.ProcessReceipt = this.processReceipt;
	}
}
