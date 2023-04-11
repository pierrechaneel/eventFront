// data offer manager class definition

import XLSX from "xlsx";
import logger from "../utils/logger";

class OfferManager {
  static async getOfferGroups() {
    let workbook;
    let offersByDurationList = [];

    try {
      workbook = XLSX.readFile("./offersListSpec.xlsx");
    } catch (error) {
      logger.error(
        `an error has occured when reading offer on group XLSX file ${error}`
      );
    }

    let worksheets = {};

    for (const sheetName of workbook.SheetNames) {
      worksheets[sheetName] = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );
    }

    worksheets["Data B2C"]?.forEach((target) => {
      const offerDesc = target["Description"]?.split(" ");

      if (!offersByDurationList?.includes(offerDesc[offerDesc?.length - 1])) {
        offersByDurationList?.push(offerDesc[offerDesc?.length - 1]);
      }
    });

    if (Object.keys(worksheets)?.length > 0) {
      return {
        processed: true,
        offerGroups: offersByDurationList,
      };
    } else {
      return {
        processed: false,
        offerGroups: null,
      };
    }
  }

  static async getPriceList(groupKey) {
    let workbook;
    let offerPriceList = [];

    try {
      workbook = XLSX.readFile("./offersListSpec.xlsx");
    } catch (error) {
      logger.error(
        `an error has occured when reading on price offer XLSX file ${error}`
      );
    }

    let worksheets = {};

    for (const sheetName of workbook.SheetNames) {
      worksheets[sheetName] = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );
    }
    console.log(
      "price key",
      worksheets["Data B2C"]?.filter((target) =>
        target["Description"]?.includes(groupKey)
      ),
      { groupKey }
    );

    worksheets["Data B2C"]
      ?.filter((target) => target["Description"]?.includes(groupKey))
      ?.forEach((target) => {
        const offerDesc = target["Prix"]?.toString()?.split("U");

        if (
          !offerPriceList?.some((priceItem) =>
            priceItem?.cost?.includes(offerDesc[0]?.split(" ")?.join(""))
          )
        ) {
          offerPriceList?.push({
            cost: offerDesc[0]?.split(" ")?.join(""),
            offerName: target["Nom Produit ou Nom Commercial"],
            offerCode: target["CODE_IPP"],
          });
        }
      });

    if (Object.keys(worksheets)?.length > 0) {
      return {
        processed: true,
        priceList: offerPriceList,
      };
    } else {
      return {
        processed: false,
        priceList: null,
      };
    }
  }
}

export default OfferManager;
