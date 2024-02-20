package com.printbank.front_app.beans.customer;

import java.util.List;

import com.printbank.front_app.beans.customer.db.FaQDataBean;

import lombok.Data;

@Data
public class FaqBean {
	private List<Faqbtn> btn;
	private List<FaQDataBean> item;
	
	@Data
	public static class Faqbtn {
		private String text;
		private boolean active;
	}
}
