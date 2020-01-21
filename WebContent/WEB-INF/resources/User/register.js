function setGun(cr){
	var city = $("[name=register_user_form] [name=city]").val();
	var gun = $("[name=register_user_form] [name=gun]");
	var gu = $("[name=register_user_form] [name=gu]");
	var dong = $("[name=register_user_form] [name=dong]");
	
	gu.empty();
	dong.empty();
	
	$.ajax({
		url : cr + "/get_gun.ida"
		, type : "post"
		, data : "city=" + city
		, success : function(gun_list){
			gun.empty();
			
			if(gun_list.length>1){
				gun.append("<option></option>");
				for(var i=0; i<gun_list.length; i++){
					gun.append("<option value=" + gun_list[i].gun +">" + gun_list[i].gun + "</option>");
				}
			} else{
				setGu(cr);
				setDong(cr);
			}
		}, error : function(){
			alert("서버와 통신 실패");
		}
	});
}

function setGu(cr){
	var gun = $("[name=register_user_form] [name=gun]").val();
	var gu = $("[name=register_user_form] [name=gu]");
	
	$.ajax({
		url : cr + "/get_gu.ida"
		, type : "post"
		, data : "gun=" + gun
		, success : function(gu_list){
			gu.empty();
			gu.append("<option></option>");
			for(var i=0; i<gu_list.length; i++){
				gu.append("<option value=" + gu_list[i].gu +">" + gu_list[i].gu + "</option>");
			}
		}, error : function(){
			alert("서버와 통신 실패");
		}
	});
}

function setDong(cr){
	var city = $("[name=register_user_form] [name=city]").val();
	var gun = $("[name=register_user_form] [name=gun]").val();
	var gu = $("[name=register_user_form] [name=gu]").val();
	var dong = $("[name=register_user_form] [name=dong]");
	
	$.ajax({
		url : cr + "/get_dong.ida"
		, type : "post"
		, data : "city=" + city + "&gun=" + gun + "&gu=" + gu
		, success : function(dong_list){
			dong.empty();
			dong.append("<option></option>");
			for(var i=0; i<dong_list.length; i++){
				dong.append("<option value=" + dong_list[i].dong +">" + dong_list[i].dong + "</option>");
			}
		}, error : function(){
			alert("서버와 통신 실패");
		}
	});
}

function registerUser(cr){
	var s_id = "[name=register_user_form] [name=s_id]";
	var pwd = "[name=register_user_form] [name=pwd]";
	var conPwd = "[name=register_user_form] [id=confirmPassword]";
	var com_name = "[name=register_user_form] [name=com_name]";
	var s_name = "[name=register_user_form] [name=s_name]";
	var s_reg_num = "[name=register_user_form] [name=s_reg_num]";
	var s_phone = "[name=register_user_form] [name=s_phone]";
	var email = "[name=register_user_form] [name=email]";
	var city = "[name=register_user_form] [name=city]";
	var gun = "[name=register_user_form] [name=gun]";
	var gu = "[name=register_user_form] [name=gu]";
	var dong = "[name=register_user_form] [name=dong]";
	
	if(is_empty(s_id)){
		alert("아이디를 입력하세요");
		$(s_id).focus();
		
		return;
	}
	
	if(checkSpace(s_id)){
		alert("공백은 입력할 수 없습니다");
		$(s_id).focus();
		
		return;
	}
	
	if(!is_valid_pattern(s_id, /^[0-9a-z]{1,10}$/)){
		alert("아이디는 영어 소문자 또는 숫자 10자리 이내만 입력할 수 있습니다");
		$(s_id).focus();
		
		return;
	}
	
	if(is_empty(pwd)){
		alert("비밀번호를 입력하세요");
		$(pwd).focus();
		
		return;
	}
	
	if(checkSpace(pwd)){
		alert("공백은 입력할 수 없습니다");
		$(pwd).focus();
		
		return;
	}
	
	if(!is_valid_pattern(pwd, /^[0-9a-z]{1,15}$/)){
		alert("비밀번호는 영어 소문자 또는 숫자 15자리 이내만 입력할 수 있습니다");
		$(pwd).focus();
		
		return;
	}
	
	if(is_empty(conPwd)){
		alert("비밀번호 확인을 입력하세요");
		$(conPwd).focus();
		
		return;
	}
	
	if(check_pwd(pwd, conPwd)){
		alert("입력한 비밀번호가 다릅니다.");
		$(conPwd).focus();
		
		return;
	}
	
	if(is_empty(com_name)){
		alert("가게명을 입력하세요");
		$(com_name).focus();
		
		return;
	}
	
	if(is_empty(s_name)){
		alert("사업자명을 입력하세요");
		$(s_name).focus();
		
		return;
	}
	
	if(!is_valid_pattern(s_name, /^[가-힣a-zA-Z0-9]+$/)){
		alert("사업자명은 영어 대소문자, 한글, 숫자만 입력할 수 있습니다");
		$(s_name).focus();
		
		return;
	}
	
	if(is_empty(s_reg_num)){
		alert("사업자등록번호를 입력하세요");
		$(s_reg_num).focus();
		
		return;
	}
	
	if(!is_valid_pattern(s_reg_num, /^[\d]{3}-[\d]{2}-[\d]{5}$/)){
		alert("사업자등록번호이 아닙니다");
		$(s_reg_num).focus();
		
		return;
	}
	
	if(is_empty(s_phone)){
		alert("핸드폰을 입력하세요");
		$(s_phone).focus();
		
		return;
	}
	
	if(!is_valid_pattern(s_phone, /^010[\d]{8}$/)){
		alert("핸드폰 형식이 아닙니다");
		$(s_phone).focus();
		
		return;
	}
	
	if(is_empty(email)){
		alert("이메일을 입력하세요");
		$(email).focus();
		
		return;
	}
	
	if(!is_valid_email(email)){
		alert("이메일 양식이 아닙니다");
		$(email).focus();
		
		return;
	}
	
	if(is_empty(city)){
		alert("시를 선택하세요");
		
		return;
	}
	
	if(is_empty(gun)){
		alert("군를 선택하세요");
		
		return;
	}
	
	if(is_empty(gu) && is_empty(dong)){
		alert("나머지 주소를 선택하세요");
		
		return;
	}

	$.ajax({
		url : cr + "/register_user_proc.ida"
		, type : "post"
		, data : $("[name=register_user_form]").serialize()
		, success : function(regCnt){
			if(regCnt==1){
				alert("회원가입에 성공");
				location.replace(cr + "/login_form.ida");
			} else if(regCnt==-1){
				alert("아이디가 중복됩니다");
			} else{
				alert("회원가입에 실패");
			}
		}, error : function(){
			alert("서버와 통신 실패");
		}
	});
}