package com.printbank.front_app.beans.utils;

import java.util.ArrayList;


import lombok.Data;

@Data
public class FooterBean {
	private ArrayList<itemBean> item;
	private sideImageBean sideImage;
	
	@Data
	public static class itemBean{
		private String type;
		private String title;
		private String href;
	}
	
	@Data
	public static class sideImageBean{
		private String href;
		private String src;
		private String alt;		
		
	}	

}
