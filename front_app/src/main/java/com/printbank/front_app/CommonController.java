package com.printbank.front_app;

import java.util.ArrayList;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.common.CommonBean;

@RequestMapping("common")
@RestController
public class CommonController {
	
	@GetMapping("util")
	public CommonBean common (Model model) {
		CommonBean common = new CommonBean();
		CommonBean.RecommendBean rec = new CommonBean.RecommendBean();
		CommonBean.SubBannerBean sub = new CommonBean.SubBannerBean();
		
		ArrayList<CommonBean.RecommendItemBean> itemlist = new ArrayList<CommonBean.RecommendItemBean>();
		ArrayList<CommonBean.NewsBean> newslist = new ArrayList<CommonBean.NewsBean>();
		
		for(int i = 0; i < 7; i++) {
			
			CommonBean.RecommendItemBean ritem = new CommonBean.RecommendItemBean();
			
			ritem.setHref("rec_href_" + i);
			ritem.setSrc("rec_src_" + i);
			ritem.setAlt("rec_alt_" + i);
			ritem.setTitle("rec_title_" + i);
			ritem.setText("rec_text_" + i);
			ritem.setAmount(i+1);
			ritem.setPrice((i+1)*1360);
			
			itemlist.add(ritem);
		}
		
		rec.setSide(false);
		rec.setItems(itemlist);
		
		for(int i = 0; i < 2; i++) {
			CommonBean.NewsBean news = new CommonBean.NewsBean();
			news.setHref("news_href_" + i);
			news.setSrc("news_src_" + i);
			news.setHead("news_head_" + i);
			news.setText("news_text_" + i);
			
			newslist.add(news);
		}
		
		sub.setHref("sub_href_0");
		sub.setSrc("sub_src_0");
		sub.setAlt("sub_alt_0");
		
		common.setRecommend(rec);
		common.setNews(newslist);
		common.setSubbanner(sub);
		
		return common;
	}
}
