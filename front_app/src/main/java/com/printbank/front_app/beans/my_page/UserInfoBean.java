package com.printbank.front_app.beans.my_page;

import lombok.Data;

@Data
public class UserInfoBean {
	private String id;
	private String name; 
	private String account;
	private String email;
	private String phone;
	private String fax;
	private String parcel;
	private String postcode;
	private String address;
	private String detailaddr;
	private boolean sms;
	private String logo;
	private String taxname;
	private String taxemail;
	private String taxphone;
	private String receipt;
}
