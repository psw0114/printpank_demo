package com.printbank.front_app.beans.main;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class MainBean {
	private List<Banner> banner;
	private Notice notice;
	private Product product;
	private List<Review> review;
	
//	private List<Recommend> recommend;
	private Recommend recommend;
	private List<News> news;
	private Banner subBanner;
	
	@Data
	public static class Banner {
		private String code;
		private String src;
		private String type;
		private String alt;
	}
	
	@Data
	public static class Notice {
		private List<Banner> banner;
		private List<NoticeData> notice;
		
		@Data
		public static class NoticeData {
			private String code;
			private String title;
			private String type;
			private String date;
		}
	}
	
	@Data
	public static class Product {
		private List<Products> product;
		private List<Banner> subBanner;
		
		@Data
		public static class Products {
			private String title;
			private List<ProductData> data;
		}
		
		@Data
		public static class ProductData {
			private String src;
			private String title;
			private String text;
			private String href;
			private String alt;
			private int amount;
			private int price;
		}
	}
	
	@Data
	public static class Review {
		private String prCode;
		private String prName;
		private String prDesc;
		private int amount;
		private int price;
		private String userName;
		private String reviewText;
		private int star;
		private String src;
		private String alt;
		private String reviewSrc;
		private String reviewAlt;
	}
	
	@Data
	public static class Recommend {
//		private String href;
//		private String src;
//		private String alt;
//		private String title;
//		private String text;
//		private int amount;
//		private int price;		
		private List<Recommends> recommend;
		
		@Data
		public static class Recommends{
		
			private String href;
			private String src;
			private String alt;
			private String title;
			private String text;
			private int amount;
			private int price;
		
		}
	}
	
	@Data
	public static class News{
		private String href;
		private String src;
		private String head;
		private String text;
	}
}