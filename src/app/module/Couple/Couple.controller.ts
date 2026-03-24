import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import CoupleServices from "./Couple.service";

const u = catchAsync(async (req, res) => {

    const result = await CoupleServices.u();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "P",
        data: result,
    });
});

const CoupleController = { u };

export default CoupleController;