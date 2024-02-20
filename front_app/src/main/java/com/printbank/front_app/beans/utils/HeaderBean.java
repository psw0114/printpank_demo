package com.printbank.front_app.beans.utils;

import java.util.List;

import lombok.Data;

@Data
public class HeaderBean {
	private List<itemBean> Item;

	@Data
	public static class itemBean {
		private String prcCode;
		private String prCode;
		private String piOdCode;
		private String item;
		private String src;
		private List<itemBean> subItem;
	}
}
