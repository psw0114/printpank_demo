//package com.printbank.front_app;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.printbank.front_app.beans.main.BannerBean;
//import com.printbank.front_app.beans.main.db.BannerBean;
//import com.printbank.front_app.beans.utils.NewsBean;
//import com.printbank.front_app.beans.utils.RecommendBean;
//import com.printbank.front_app.services.CshService;
//
//
//
//@RestController
//@RequestMapping(value = {"utils"})
//public class UtilsController {
//	
//	@Autowired
//	private CshService cServ;
//	
//	@GetMapping(value = {"recommend"})
//	public RecommendBean recommend (Model model) {
//		RecommendBean recommend = new RecommendBean();
//		
//		ArrayList<RecommendBean.RecItemsBean> reclist = new ArrayList<RecommendBean.RecItemsBean>();
//		
//		for(int i = 1; i < 10; i++) {
//			RecommendBean.RecItemsBean recitem = new RecommendBean.RecItemsBean();
//			
//			recitem.setHref("product");
//			recitem.setSrc("");
//			recitem.setAlt("recommend_item_alt" + i);
//			recitem.setTitle("recommend_item_title_" + i);
//			recitem.setText("recommend_item_text_" + i);
//			recitem.setAmount(100);
//			recitem.setPrice(i*1550);
//			
//			reclist.add(recitem);
//		}
//		
//		recommend.setSide(false);
//		recommend.setItem(reclist);
//		
//		return recommend;
//	}
//	
//	@GetMapping(value = {"news"})
//	public NewsBean news (Model model) {
//		NewsBean news = new NewsBean();
//		
//		ArrayList<NewsBean.NewsItemBean> newslist = new ArrayList<NewsBean.NewsItemBean>();
//		
//		for(int i = 1; i < 3; i++) {
//			NewsBean.NewsItemBean newsitem = new NewsBean.NewsItemBean();
//			
//			newsitem.setHref("customer");
//			newsitem.setSrc("");
//			newsitem.setHead(i%2 == 0 ? "NEW 이번주 소식" : "Event 이벤트 신청하세요!");
//			newsitem.setText(i%2 == 0 ? "이번주 신규 소식을 확인해보세요!" : "이벤트 신청하시고 샘플 받아가세요.");
//			
//			newslist.add(newsitem);
//		}
//		
//		news.setNews(newslist);
//		
//		return news;
//	}
//	
//	@GetMapping(value = {"subBanner"})
//	public BannerBean Banner (Model model) {
//		cServ.SubBanner(model);
//		
//		return (BannerBean)model.getAttribute("Data");
//	}
//}
