import experess from "express";
const router = experess.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";
import makeUploader from "./libs/utils/uploader";
import teamController from "./controllers/team.controller";
import resultController from "./controllers/result.controller";
import customerController from "./controllers/cutomer.controller";
import articleController from "./controllers/article.controller";
import messageController from "./controllers/message.controller";
import faqController from "./controllers/faq.controller";

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
    { name: "univerImages", maxCount: 3 }, // Array of images upload
  ]),
  memberController.updateMember
);

router.get("/member/top-users", memberController.getTopUsers);

/* Team */
router.post(
  "/team/create",
  memberController.verifyAuth,
  uploader("teams").single("image"),
  teamController.createNewTeam
);
router.get("/team/all", teamController.getTeams);
router.get("/team/:id", memberController.retrieveAuth, teamController.getTeam);
router.post(
  "/team/update/:id",
  memberController.verifyAuth,
  uploader("teams").single("image"),
  teamController.updateTeam
);
router.post(
  "/team/remove/:id",
  memberController.verifyAuth,
  teamController.removeTeam
);
/* Result*/
router.post(
  "/result/create",
  memberController.verifyAuth,
  uploader("result").array("resultImages", 5),
  resultController.createResult
);
router.post(
  "/result/remove/:id",
  memberController.verifyAuth,
  resultController.removeResult
);
router.get(
  "/result/all",
  memberController.retrieveAuth,
  resultController.getAllResults
);
/* Customer */
router.post(
  "/customer/create",
  memberController.verifyAuth,
  uploader("customers").single("image"),
  customerController.createNewCustomer
);
router.get("/customer/all", customerController.getCustomers);
router.get(
  "/customer/:id",
  memberController.retrieveAuth,
  customerController.getCustomer
);
router.post(
  "/customer/update/:id",
  memberController.verifyAuth,
  uploader("customers").single("video"),
  customerController.updateCustomer
);
router.post(
  "/customer/remove/:id",
  memberController.verifyAuth,
  customerController.removeCustomer
);
/* Article */
router.post(
  "/article/create",
  memberController.verifyAuth,
  uploader("articles").single("image"),
  articleController.createNewArticle
);
router.get("/article/all", articleController.getArticles);
router.get(
  "/article/:id",
  memberController.retrieveAuth,
  articleController.getArticle
);
router.post(
  "/article/update/:id",
  memberController.verifyAuth,
  uploader("articles").single("image"),
  articleController.updateArticle
);
router.post(
  "/article/remove/:id",
  memberController.verifyAuth,
  articleController.removeArticle
);

/* <Message> */

router.post(
  "/message/create",
  memberController.retrieveAuth,
  messageController.createMessage
);
router.get(
  "/message/all",
  memberController.verifyAuth,
  messageController.getMessages
);
/* Faq */
router.post(
  "/faq/create",
  memberController.verifyAuth,
  faqController.createFaq
);
router.get("/faq/all", faqController.getFaqs);
router.get("/faq/:id", memberController.retrieveAuth, faqController.getFaq);
router.post(
  "/faq/update/:id",
  memberController.verifyAuth,
  faqController.updateFaq
);
router.post(
  "/faq/remove/:id",
  memberController.verifyAuth,
  faqController.removeFaq
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
