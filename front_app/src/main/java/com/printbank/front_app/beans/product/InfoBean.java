package com.printbank.front_app.beans.product;

import java.util.ArrayList;

import lombok.Data;

@Data
public class InfoBean {
	private ArrayList<ImageBean> image;
	

	@Data
	public static class ImageBean {
		private String src;
		private String alt;
	}
}
