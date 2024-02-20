package com.printbank.front_app.beans.customer;

import java.util.List;

import com.printbank.front_app.beans.customer.db.NoticeDataBean;

import lombok.Data;

@Data
public class CustomerNoticeBean {
	private List<Noticebtn> btn;
	private List<NoticeDataBean> item;
	
	@Data
	public static class Noticebtn {
		private String text;
		private boolean active;
	}
}
