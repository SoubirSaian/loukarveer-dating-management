import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import DateServices from "./Date.service";

const u = catchAsync(async (req, res) => {

    const result = await DateServices.u();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "P",
        data: result,
    });
});

const DateController = { u };

export default DateController;