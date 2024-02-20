package com.printbank.front_app;

import java.util.ArrayList;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.utils.FooterBean;

@RestController
@RequestMapping(value = {"footer"})
public class FooterController {
	@GetMapping(value = {"item"})
	public FooterBean footer (Model model) {
		FooterBean footer = new FooterBean();
		ArrayList<FooterBean.itemBean> itemlist = new ArrayList<FooterBean.itemBean>();

		for (int i = 0; i < 5; i++) {
			FooterBean.itemBean  item = new FooterBean.itemBean();

			switch (i){
				case 0:
					 item.setType("A");
					 item.setTitle("회사소개");
					 item.setHref("signin");
					 break;
				case 1:
					 item.setType("B");
					 item.setTitle("개인정보취급방침");
					 item.setHref("signin");
					 break;
				case 2:
					 item.setType("C");
					 item.setTitle("찾아오시는길");
					 item.setHref("signin");
					 break;
				case 3:
					 item.setType("D");
					 item.setTitle("이용약관");
					 item.setHref("signin");
					 break;
				case 4:
					 item.setType("E");
					 item.setTitle("고객센터");
					 item.setHref("customer");
					 break;
				default:;
			}

			itemlist.add(item);
		}

		FooterBean.sideImageBean sideImage = new FooterBean.sideImageBean();

		sideImage.setHref("main");
		sideImage.setSrc("/resource/images/column_logo.gif");
		sideImage.setAlt("img");

		footer.setItem(itemlist);
		footer.setSideImage(sideImage);

		return footer;
	}
}
