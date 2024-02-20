//package com.printbank.front_app;
//
//import java.util.ArrayList;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.printbank.front_app.beans.util.HeaderBean;
////import com.printbank.front_app.services.ServiceTest;
//
//@RestController
//@RequestMapping(value = {"header"})
//public class HeaderController {
//	
////	@Autowired
////	private ServiceTest serviceTest;	
//
//	@GetMapping(value = {"item"})
//	public HeaderBean header (Model model) {
//		HeaderBean header = new HeaderBean();
//		ArrayList<HeaderBean.itemBean> itemList = new ArrayList<HeaderBean.itemBean>();
//		// HeaderBean.memberCardBean memberCard = new HeaderBean.memberCardBean();
//		String[] itemArry = {"상업인쇄","디지털인쇄(인디고)","디지털인쇄(토너)","판촉물","실사출력","샘플/부자재"};
//		String[] subItemArry = {"명함","스티커","전단/리플렛/포스터","봉투","책자"};
//		String[] productArry = {"기본명함","재질명함","카드명함","랜덤명함","3D금박명함"};
//
//		for (int i = 0; i < itemArry.length; i++ ) {
//			ArrayList<HeaderBean.itemBean> subItemaList = new ArrayList<HeaderBean.itemBean>();
//			HeaderBean.itemBean item = new HeaderBean.itemBean();
//
//			item.setItem(itemArry[i]);
//
//			for (int j = 0; j < subItemArry.length; j++) {
//				ArrayList<HeaderBean.itemBean> productItemList = new ArrayList<HeaderBean.itemBean>();
//				HeaderBean.itemBean items = new HeaderBean.itemBean();
//
//				items.setItem(subItemArry[j]);
//
//				for (int k = 0; k < productArry.length; k++) {
//					ArrayList<HeaderBean.itemBean> imgsItemList = new ArrayList<HeaderBean.itemBean>();
//					HeaderBean.itemBean products = new HeaderBean.itemBean();
//
//					products.setItem(productArry[k]);
//
//					for (int l = 0; l < 5; l++) {
//						HeaderBean.itemBean imgs = new HeaderBean.itemBean();
//
//						imgs.setSrc("");
//
//						imgsItemList.add(imgs);
//					}
//
//					products.setSubItem(imgsItemList);
//
//					productItemList.add(products);
//				}
//
//				items.setSubItem(productItemList);
//
//				subItemaList.add(items);
//			}
//
//			item.setSubItem(subItemaList);
//
//			itemList.add(item);
//		}
//
//		header.setItem(itemList);
//
//		return header;
//		/*		ArrayList<HeaderBean.memberCardBean.menuBean> menuBeanList = new ArrayList<HeaderBean.memberCardBean.menuBean>();
//		ArrayList<HeaderBean.memberCardBean.recentBean> recentBeanList = new ArrayList<HeaderBean.memberCardBean.recentBean>();
//		String[] menuTitles = {"장바구니", "주문/배송 조회", "1:1 문의상담", "A/S 상담", "견적상담", "회원정보수정"};
//		String[] menuHrefs = {"bucket_list", "my_page?type=C", "my_page?type=D", "my_page?type=E", "my_page?type=F", "my_page?type=H"};
//
//		for (int i = 0; i < menuTitles.length; i++) {
//			HeaderBean.memberCardBean.menuBean menu = new  HeaderBean.memberCardBean.menuBean();
//
//			menu.setTitle(menuTitles[i]);
//			menu.setHref(menuHrefs[i]);
//
//			menuBeanList.add(menu);
//		}
//
//		for (int i = 0; i < 2; i++ ) {
//			HeaderBean.memberCardBean.recentBean recent = new  HeaderBean.memberCardBean.recentBean();
//			recent.setHref("product");
//			recent.setSrc("");
//			recent.setAlt("img"+ i);
//			recent.setHead("고품격명함" + i);
//			recent.setText("이런저런설명" + i);
//			recent.setAmount(100);
//			recent.setPrice(3000);
//
//			recentBeanList.add(recent);
//		}
//
//		memberCard.setMenu(menuBeanList);
//		memberCard.setRecent(recentBeanList);
//		*/
//
//		// header.setMemberCard(memberCard);
//
//	}
//}
