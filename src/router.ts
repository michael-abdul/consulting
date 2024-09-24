import experess from "express";
const router = experess.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";
import makeUploader from "./libs/utils/uploader";
import teamController from "./controllers/team.controller";
/* Member*/
router.get("/member/restaurant", memberController.getRestaurant);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);

router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").fields([
    { name: "memberImage", maxCount: 1 }, // Single image upload
    { name: "univerImages", maxCount: 3 } // Array of images upload
  ]),
  memberController.updateMember
);

router.get("/member/top-users", memberController.getTopUsers);

/* Team */
router.post(
  "/team/create",
  memberController.retrieveAuth,uploader("teams").single("image"),
  teamController.createNewTeam
);
/* Product*/
router.get("/product/all", productController.getProducts);
router.get(
  "/product/:id",
  memberController.retrieveAuth,
  productController.getProduct
);
/* Order */

router.post(
  "/order/create",
  memberController.verifyAuth,
  orderController.createOrder
);
router.get(
  "/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders
);
router.post(
  "/order/update",
  memberController.verifyAuth,
  orderController.updateOrder
);

export default router;
