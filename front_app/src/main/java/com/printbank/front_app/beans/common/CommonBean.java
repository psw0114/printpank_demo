package com.printbank.front_app.beans.common;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class CommonBean {
	private RecommendBean recommend;
	private ArrayList<NewsBean> news;
	private SubBannerBean subbanner;
	
	@Data
	public static class RecommendBean{
		private boolean isSide;
		private List<RecommendItemBean> items;
	}
	
	@Data
	public static class RecommendItemBean{
		private String href;
		private String src;
		private String alt;
		private String title;
		private String text;
		private int amount;
		private int price;
	}
	
	@Data
	public static class NewsBean{
		private String href;
		private String src;
		private String head;
		private String text;		
	}
	
	@Data
	public static class SubBannerBean{
		private String href;
		private String src;
		private String alt;
	}
}
