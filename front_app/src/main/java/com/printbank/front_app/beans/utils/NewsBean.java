package com.printbank.front_app.beans.utils;

import java.util.ArrayList;

import lombok.Data;

@Data
public class NewsBean {
	private ArrayList<NewsItemBean> news;
	
	@Data
	public static class NewsItemBean{
		private String href;
		private String src;
		private String head;
		private String text;
	}
}
