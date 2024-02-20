package com.printbank.front_app;

import java.util.ArrayList;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.payment.PaymentBean;

@RequestMapping("/payment")
@RestController
public class PaymentController {
	@GetMapping("/pay")
	public PaymentBean payment (Model model) {
		PaymentBean payment = new PaymentBean();
		ArrayList<PaymentBean.ItemListBean> list = new ArrayList<PaymentBean.ItemListBean>();
		
		for(int i = 0; i < 6; i++) {
			PaymentBean.ItemListBean items = new PaymentBean.ItemListBean();
			
			items.setSrc("src_" + i);
			items.setPname("pname_" + i);
			items.setOptionlist("option_" + i);
			items.setParcel("address_" + i);
			items.setPrice((i+1)*1350);
			
			list.add(items);
		}
		
		payment.setPayment(list);
		
		return payment;
	}
	
	
}
