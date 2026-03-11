import type { PaymentStatus } from "../../../../generated/prisma/enums.js";

export function mapStatus(status: string): PaymentStatus {

    switch (status) {
        case "approved":
            return "APPROVED";

        case "pending":
            return "PENDING";

        case "rejected":
            return "REJECTED";

        case "cancelled":
            return "CANCELED";

        default:
            return "PENDING";
    }

}