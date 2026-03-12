/*
  Warnings:

  - You are about to drop the column `industry` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `marketCap` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Stock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticker]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finnhubIndustry` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipo` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketCapitalization` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shareOutstanding` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticker` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Made the column `exchange` on table `Stock` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Stock_symbol_key";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "industry",
DROP COLUMN "logoUrl",
DROP COLUMN "marketCap",
DROP COLUMN "symbol",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "estimateCurrency" TEXT,
ADD COLUMN     "finnhubIndustry" TEXT NOT NULL,
ADD COLUMN     "ipo" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "marketCapitalization" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "priceUpdatedAt" TIMESTAMP(3),
ADD COLUMN     "shareOutstanding" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ticker" TEXT NOT NULL,
ADD COLUMN     "weburl" TEXT,
ALTER COLUMN "exchange" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stock_ticker_key" ON "Stock"("ticker");
