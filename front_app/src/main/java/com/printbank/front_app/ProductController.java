package com.printbank.front_app;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.product.DescBean;
import com.printbank.front_app.beans.product.DetailBean;
import com.printbank.front_app.beans.product.InfoBean;
import com.printbank.front_app.beans.product.ReviewBean;

@RestController
@RequestMapping(value = {"product"})
public class ProductController {
	@GetMapping(value = {"desc"})
	public DescBean desc (Model model) {
		DescBean desc = new DescBean();
		ArrayList<DescBean.ItemBean> list = new ArrayList<DescBean.ItemBean>();
		
		for (int i = 1; i < 8; i++) {
			DescBean.ItemBean item = new DescBean.ItemBean();
			
			item.setSrc("");
			item.setAlt("desc_img_" + i);
			
			list.add(item);
		}
		
		desc.setDesc(list);
		
		return desc;
	}
	
	@GetMapping(value = {"detail"})
	public DetailBean detail (Model model) {
		DetailBean detail = new DetailBean();
		DetailBean.OptionItemBean option = new DetailBean.OptionItemBean();
		List<DetailBean.ContentBean> contentlist = new ArrayList<DetailBean.ContentBean>();
		ArrayList<DetailBean.DetailItemBean> detaillist = new ArrayList<DetailBean.DetailItemBean>(); // 용지, 사이즈, 인쇄도수 등등
		ArrayList<DetailBean.OptionItemBean> optionlist = new ArrayList<DetailBean.OptionItemBean>(); // 추가옵션
		ArrayList<DetailBean.DescItemBean> desclist = new ArrayList<DetailBean.DescItemBean>(); // 각 추가 옵션별 내용
		
		for (int i = 1; i < 5; i++) {
			DetailBean.DetailItemBean details = new DetailBean.DetailItemBean();
			List<DetailBean.SelectOptionBean> selectlist = new ArrayList<DetailBean.SelectOptionBean>();
			
			details.setTitle("option_" + i);
			
			for (int j = 1; j < 6; j ++) {
				DetailBean.SelectOptionBean select = new DetailBean.SelectOptionBean();

				select.setText("select_" + j);
				select.setValue("value_" + j);
				
				selectlist.add(select);
			}
			
			details.setOption(selectlist);
			detaillist.add(details);
		}
		
		option.setTitle("추가옵션");

		for (int i = 1; i < 8; i++) {			
			DetailBean.ContentBean cont = new DetailBean.ContentBean();
			
			cont.setText("Option_" + i);
			cont.setActive(false);
			
			contentlist.add(cont);

			option.setContent(contentlist);
		}

		optionlist.add(option);
		
		for (int i = 1; i < 8; i++) {
			DetailBean.DescItemBean desc = new DetailBean.DescItemBean();
			List<DetailBean.SelectOptionBean> selectlist = new ArrayList<DetailBean.SelectOptionBean>();
			
			desc.setTitle("option_" + i);
			desc.setActive(false);
			desc.setSrc("");
			desc.setKnowhow_src("");
			desc.setDesc("desc_" + i);
			
			for (int j = 0; j < 5; j++) {
				DetailBean.SelectOptionBean select = new DetailBean.SelectOptionBean();

				select.setText("select_" + j);
				select.setValue("value_" + j);
				
				selectlist.add(select);
			}

			desc.setFlist(selectlist);
			desc.setSlist(selectlist);
			
			desclist.add(desc);
		}
		
		detail.setDetail(detaillist);
		detail.setOption(optionlist);
		detail.setDesc(desclist);
		
		return detail;
	}
	
	@GetMapping(value = {"info"})
	public InfoBean info (Model model) {
		InfoBean info = new InfoBean();
		ArrayList<InfoBean.ImageBean> imagelist = new ArrayList<InfoBean.ImageBean>();
		
		for (int i = 1; i < 4; i++) {
			InfoBean.ImageBean image = new InfoBean.ImageBean();
			
			image.setSrc("");
			image.setAlt("info_alt_" + i);
			
			imagelist.add(image);
		}
		
		info.setImage(imagelist);
		
		return info;
	}
	
	@GetMapping(value = {"review"})
	public ReviewBean review (Model model) {
		ReviewBean review = new ReviewBean();
		ArrayList<ReviewBean.ReviewDataBean> reviewlist = new ArrayList<ReviewBean.ReviewDataBean>();
		
		for (int i = 1; i < 10; i++) {
			ReviewBean.ReviewDataBean reviewdata = new ReviewBean.ReviewDataBean();
			
			reviewdata.setStar(i % 5);
			reviewdata.setText("review_text_" + i);
			reviewdata.setName("user_" + i);
			reviewdata.setDate("2023-11-1" + i);
			reviewdata.setSrc(((i % 4) == 0) ? "resource/images/icon_1.png" : "");
			reviewdata.setTitle("review_title_" + i);
			
			reviewlist.add(reviewdata);
		}
		
		review.setReviewShow("all");
		review.setReview(reviewlist);
		
		return review;
	}
}
