package com.printbank.front_app.beans.product;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class DetailBean {
	private ArrayList<DetailItemBean> detail;
	private ArrayList<OptionItemBean> option;
	private ArrayList<DescItemBean> desc;
	
	@Data
	public static class DetailItemBean {
		private String title;
		private List<SelectOptionBean> option; 
	}
	
	@Data
	public static class SelectOptionBean {
		private String value;
		private String text;
	}
	
	@Data
	public static class OptionItemBean {
		private String title;
		private List<ContentBean> content;
	}
	
	@Data
	public static class ContentBean {
		private String text;
		private boolean active;
	}
	
	@Data
	public static class DescItemBean {
		private String title;
		private boolean active;
		private String src;
		private String knowhow_src;
		private String desc;
		private List<SelectOptionBean> flist;
		private List<SelectOptionBean> slist;
	}
}
