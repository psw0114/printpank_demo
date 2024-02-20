package com.printbank.front_app;

import java.util.ArrayList;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.my_page.DeliveryBean;
import com.printbank.front_app.beans.my_page.ManageBean;
import com.printbank.front_app.beans.my_page.MtmBean;
import com.printbank.front_app.beans.my_page.ParcelBean;
import com.printbank.front_app.beans.my_page.SideMenuBean;
import com.printbank.front_app.beans.my_page.UserInfoBean;

@RestController
@RequestMapping(value = {"my_page"})
public class MyPageController {
	
	@GetMapping(value = {"delivery"})
	public DeliveryBean delivery(Model model) {
		DeliveryBean delivery = new DeliveryBean();
		ArrayList<DeliveryBean.ItemBean> items = new ArrayList<DeliveryBean.ItemBean>();
		ArrayList<DeliveryBean.SummaryBean> sums = new ArrayList<DeliveryBean.SummaryBean>();
		
		for (int i = 1; i < 9; i++) {
			DeliveryBean.SummaryBean summary = new DeliveryBean.SummaryBean();

			summary.setCount(i * 4);
			summary.setText("접수상태_" + i);
			sums.add(summary);
		}
		
		for (int i = 1; i < 7; i++) {
			DeliveryBean.ItemBean item = new DeliveryBean.ItemBean();

			item.setSrc("");
			item.setDate("23.8.1" + i);
			item.setPname("가나다라_명함_" + i);
			item.setPoption("사각재단 스티커/배경없음(원터치)/강접 아트지90g유광코팅/별사이즈(60x50mm)/1,000매 1	건/방문(충무로)");
			item.setPrice(i * 5350);
			item.setState(i % 4);
			item.setAlt("item_img_" + i);
			
			items.add(item);
		}
		
		delivery.setItems(items);
		delivery.setSummary(sums);
		
		return delivery;
	}
	
	@GetMapping(value = {"parcel"})
	public ParcelBean parcel (Model model) {
		ParcelBean parcel = new ParcelBean();
		ArrayList<ParcelBean.ParcelListBean> list = new ArrayList<ParcelBean.ParcelListBean>();

		for (int i = 1; i < 6; i++) {
			ParcelBean.ParcelListBean plist = new ParcelBean.ParcelListBean();
			
			plist.setName("user_" + i);
			plist.setAddress("abc-ddd " + i);
			plist.setPhone("000-" + (i * 1000) + "-" + (i * 1000));
			plist.setCall("03" + i + "-" + (i * 100) + "-" + (i * 1000));
			
			list.add(plist);
		}

		parcel.setParcel(list);
		
		return parcel;
	}
	
	@GetMapping(value = {"manager"})
	public ManageBean manager (Model model) {
		ManageBean manager = new ManageBean();
		ArrayList<ManageBean.ManagerBean> list = new ArrayList<ManageBean.ManagerBean>();
		
		for (int i = 1; i < 6; i++) {
			ManageBean.ManagerBean manage = new ManageBean.ManagerBean();
			
			manage.setManager("manager_" + i);
			manage.setPhone("000-" + (i * 1000) + "-" + (i * 1000));
			manage.setCall("03" + i + "-" + (i * 100) + "-" + (i * 1000));
			
			list.add(manage);
		}
		
		manager.setManagerlist(list);
		
		return manager;
	}
	
	@GetMapping(value = {"mtm", "as", "est"})
	public MtmBean mtm (Model model) {
		MtmBean mtm = new MtmBean();
		ArrayList<MtmBean.MtmItemBean> list = new ArrayList<MtmBean.MtmItemBean>();
		
		for(int i = 1; i < 7; i++) {
			MtmBean.MtmItemBean items = new MtmBean.MtmItemBean();
			
			items.setType(i % 5);
			items.setTitle("title_" + i);
			items.setPnum("product_orderNum_" + i);
			items.setDate("2023-0" + i + "-1" + i);
			items.setState(i % 2);
			
			list.add(items);
		}
		
		mtm.setMtm(list);
		
		return mtm;
	}
	
	@GetMapping(value = {"user"})
	public UserInfoBean user (Model model) {
		UserInfoBean user = new UserInfoBean();
		
		user.setId("UserID");
		user.setName("Username");
		user.setAccount("국민 7027-9085-839562");
		user.setEmail("Email@email.mail");
		user.setPhone("00010001000");
		user.setFax("0311001000");
		user.setParcel("충무로 ");
		user.setPostcode("11111");
		user.setAddress("abc ddd efge");
		user.setDetailaddr("000-00");
		user.setSms(false);
		user.setLogo("src");
		user.setTaxname("taxuser");
		user.setTaxemail("TaxEmail@taxemail.mail");
		user.setTaxphone("00010011022");
		user.setReceipt("00012313213");
		
		return user;
	}
}
