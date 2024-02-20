package com.printbank.front_app.beans.signup;

import java.util.ArrayList;

import lombok.Data;

@Data
public class ButtonBean {
	private ArrayList<ButtonItemBean> button;
	
	@Data
	public static class ButtonItemBean{
		private String title;
		private String desc;
		private String type;
	}
}
