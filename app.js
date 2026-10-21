/**
 * 중소벤처기업부 알리미 인터랙티브 스크립트
 * 프레임워크 없는 순수 Vanilla JavaScript (더블클릭 실행 지원)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // [신규] 국민 맞춤 지원 자가진단 설문 & 체크리스트 엔진
  // ==========================================

  // 각 신분(Status)별 체크리스트 문항
  const checklistQuestions = {
    soho: [
      { id: 'soho_loan', title: '고금리 대출이자 및 부채 상환 부담이 너무 큽니다.', desc: '저금리 대환대출, 상환기간 연장, 채무조정 필요' },
      { id: 'soho_bill', title: '전기요금, 수도세, 임대료 등 고정 유지비가 버겁습니다.', desc: '소상공인 고정비용 경감 및 경영안정비 지원 필요' },
      { id: 'soho_tech', title: '키오스크, 테이블오더, AI 주문 등 디지털 도입을 원합니다.', desc: '스마트상점 기술보급 사업(기기 도입비 최대 70% 지원)' },
      { id: 'soho_sales', title: '손님이 줄어 전통시장/골목상권 고객 유치가 절실합니다.', desc: '온누리상품권 가맹점 등록, 동행축제 판로 연계' },
      { id: 'soho_restart', title: '폐업을 고민 중이거나 안전한 폐업 후 재기를 원합니다.', desc: '희망리턴패키지(점포철거비 최대 250만원 지원 및 재취업/재창업)' }
    ],
    startup: [
      { id: 'startup_fund', title: '시제품 개발 및 초기 사업화 자금이 부족합니다.', desc: '예비·초기창업패키지(최대 1억 원 무상 사업화 지원)' },
      { id: 'startup_invest', title: '민간 VC 투자 유치 및 정부 R&D 연계 매칭을 원합니다.', desc: 'TIPS 프로그램(민간투자 연계 최대 5~7억 원 R&D 매칭)' },
      { id: 'startup_global', title: '국내 시장을 넘어 해외 진출 및 규제 특례 실증을 원합니다.', desc: '글로벌 혁신특구, K-스타트업 글로벌 진출 패키지' },
      { id: 'startup_space', title: '창업 공간(입주공간)과 전문가 멘토링이 필요합니다.', desc: '창조경제혁신센터 입주, 창업보육센터(BI) 지원' }
    ],
    sme: [
      { id: 'sme_raw', title: '원자재 가격이 폭등했으나 납품단가에 반영되지 않습니다.', desc: '납품대금 연동제(수·위탁거래 공정화 및 동행기업 인센티브)' },
      { id: 'sme_smart', title: '공장 생산성을 높이고 불량률을 줄일 AI/스마트공장이 필요합니다.', desc: '스마트공장 구축 및 AI 자율제조 고도화 지원' },
      { id: 'sme_export', title: '해외 판로 개척, 수출 규격인증, 물류비 지원을 원합니다.', desc: '수출바우처 사업(최대 1억 원 상당 바우처 지원)' },
      { id: 'sme_policy', title: '시설 투자나 기술 개발을 위한 대규모 정책자금이 필요합니다.', desc: '중소벤처기업진흥공단(중진공) 정책자금 융자 및 이차보전' }
    ],
    citizen: [
      { id: 'citizen_discount', title: '생활비/장바구니 물가를 아끼고 할인 혜택을 받고 싶습니다.', desc: '디지털 온누리상품권 10% 상시할인 및 명절 환급' },
      { id: 'citizen_edu', title: '창업에 관심이 있어 무료 온라인 교육을 듣고 싶습니다.', desc: '창업에듀(무료 실무 창업 강의 플랫폼)' },
      { id: 'citizen_fair', title: '착한 중소기업·소상공인 우수 제품을 저렴하게 사고 싶습니다.', desc: '전국 동행축제(살맛나는 행복쇼핑 및 온라인 할인전)' },
      { id: 'citizen_unfair', title: '하도급 거래나 납품 시 부당한 갑질/기술탈취를 당했습니다.', desc: '중기부 불공정거래 상담 및 기술침해 원스톱 구제' }
    ]
  };

  // 상세 매칭 솔루션 데이터
  const solutionDatabase = {
    // 소상공인 솔루션
    soho_loan: {
      tag: '금융 안심 솔루션',
      title: '소상공인 금융 3종 세트 & 전환보증',
      benefit: '👉 3.2조 원 규모 전환보증 공급, 저금리 대환대출 거치기간 연장, 전국 30개 채무조정센터 신속 회생 지원',
      target: '고금리 채무로 어려움을 겪는 모든 소상공인·자영업자',
      url: 'https://www.semas.or.kr',
      btnText: '소진공 대환대출 안내 ↗'
    },
    soho_bill: {
      tag: '경영비용 완화',
      title: '소상공인 경영부담 완화 패키지',
      benefit: '👉 전기요금 최대 20만 원 감면 지원 및 영세 소상공인 배달·택배비 등 실질 고정비용 재정 지원',
      target: '연매출 기준 일정 규모 이하 영세 소상공인',
      url: 'https://www.mss.go.kr',
      btnText: '중기부 공고 확인 ↗'
    },
    soho_tech: {
      tag: '디지털 전환(AX)',
      title: '스마트상점 기술보급 사업',
      benefit: '👉 키오스크, 테이블오더, 스마트오더, 서빙로봇 등 첨단 스마트기기 도입비용의 50~70% 국비 지원',
      target: '매장 운영 효율화와 인건비 절감을 원하는 점포 사장님',
      url: 'https://www.sbiz.or.kr',
      btnText: '스마트상점 신청 ↗'
    },
    soho_sales: {
      tag: '매출 활성화',
      title: '온누리상품권 가맹 및 동행축제 참여',
      benefit: '👉 모바일/카드형 온누리상품권 가맹점 가입으로 10% 할인 혜택을 찾는 손님 유입 확대 및 동행축제 기획전 연계',
      target: '전통시장 및 골목형 상점가 상인',
      url: 'https://www.sbiz.or.kr',
      btnText: '온누리상품권 가맹 ↗'
    },
    soho_restart: {
      tag: '재도전 안전망',
      title: '희망리턴패키지 (원스톱 폐업지원 & 재취업/재창업)',
      benefit: '👉 점포 철거·원상복구비 최대 250만 원 무상 지원 + 재기 교육 및 전직 장려금 수당 지급',
      target: '폐업을 앞두고 있거나 폐업 후 재출발을 희망하는 소상공인',
      url: 'https://www.sbiz.or.kr',
      btnText: '희망리턴패키지 신청 ↗'
    },

    // 스타트업 솔루션
    startup_fund: {
      tag: '초기 사업화',
      title: '예비·초기창업패키지',
      benefit: '👉 혁신 아이디어를 가진 창업자에게 평균 5,000만 원 ~ 최대 1억 원의 사업화 자금(시제품 제작, 마케팅) 무상 지원',
      target: '사업자등록 전 예비창업자 또는 3년 이내 초기 창업기업',
      url: 'https://www.k-startup.go.kr',
      btnText: 'K-Startup 사업공고 ↗'
    },
    startup_invest: {
      tag: '스케일업 투자',
      title: 'TIPS (민관공동 창업자 지원 프로그램)',
      benefit: '👉 TIPS 운영사(엔젤·VC)가 1~2억 원 선투자 시 정부가 R&D 자금 최대 5억 원 + 창업사업화 최대 2억 원을 매칭 지원',
      target: '우수한 기술력과 성장 잠재력을 갖춘 유망 기술 스타트업',
      url: 'https://www.jointips.or.kr',
      btnText: 'TIPS 운영사 찾기 ↗'
    },
    startup_global: {
      tag: '글로벌 진출',
      title: '글로벌 혁신특구 & 컴업(COMEUP)',
      benefit: '👉 신산업 규제 특례 적용, 해외 실증 비용 지원 및 아시아 최대 스타트업 축제 COMEUP을 통한 글로벌 VC 피칭 연계',
      target: '해외 시장 진출을 목표로 하는 딥테크·바이오·모빌리티 스타트업',
      url: 'https://www.mss.go.kr',
      btnText: '글로벌 특구 안내 ↗'
    },
    startup_space: {
      tag: '인프라 및 멘토링',
      title: '창조경제혁신센터 및 창업보육센터(BI)',
      benefit: '👉 저렴한 임대료의 사무공간 제공, 특허·법률·세무 원스톱 멘토링, 지역 특화 액셀러레이팅 프로그램 운영',
      target: '업무 공간과 전문가 네트워킹이 필요한 창업 초기 팀',
      url: 'https://ccei.creativekorea.or.kr',
      btnText: '창조경제혁신센터 ↗'
    },

    // 중소 제조기업 솔루션
    sme_raw: {
      tag: '공정거래 수호',
      title: '납품대금 연동제(수·위탁 공정거래)',
      benefit: '👉 원자재 가격이 10% 이상 변동 시 납품단가 협의 의무화, 불공정 감액 방지 및 동행기업 가점 부여',
      target: '원자재 가격 상승분을 납품단가에 반영받기 어려운 하청 제조 중소기업',
      url: 'https://www.mss.go.kr',
      btnText: '납품대금 연동제 상담 ↗'
    },
    sme_smart: {
      tag: '생산성 혁신(AX)',
      title: '스마트공장 구축 및 지능형 제조 솔루션',
      benefit: '👉 제조 현장 IoT, AI 기반 생산 설비 제어 및 ERP/MES 도입 비용을 정부가 최대 50% 매칭 지원',
      target: '생산성 향상 및 품질 개선을 원하는 중소·중견 제조기업',
      url: 'https://www.smart-factory.kr',
      btnText: '스마트공장 사업단 ↗'
    },
    sme_export: {
      tag: '글로벌 판로',
      title: '중소기업 수출바우처 사업',
      benefit: '👉 3,000만 원 ~ 최대 1억 원 상당 바우처 발급! 디자인, 해외 규격 인증, 바이어 매칭, 물류비 등에 자유롭게 활용',
      target: '직·간접 수출을 추진하거나 확대하려는 중소 제조기업',
      url: 'https://www.exportvoucher.com',
      btnText: '수출바우처 포털 ↗'
    },
    sme_policy: {
      tag: '성장 자금',
      title: '중진공 정책자금 융자 및 이차보전',
      benefit: '👉 시중은행 대비 저렴한 금리로 시설 자금 및 운전자금을 최대 수십억 원 한도로 장기 분할상환 지원',
      target: '기계 도입, 공장 신증설, R&D 투자가 필요한 중소벤처기업',
      url: 'https://kosmes.or.kr',
      btnText: '중진공 정책자금 신청 ↗'
    },

    // 일반 국민 솔루션
    citizen_discount: {
      tag: '국민 장바구니 혜택',
      title: '디지털 온누리상품권 상시 10% 할인',
      benefit: '👉 온누리상품권 앱에서 계좌 등록 후 충전 시 즉시 10% 할인 구매 가능! 전통시장 및 골목상가에서 QR·바코드로 간편 결제',
      target: '전통시장과 동네 골목 상점을 애용하는 모든 대한민국 국민',
      url: 'https://www.sbiz.or.kr',
      btnText: '온누리상품권 앱 설치 ↗'
    },
    citizen_edu: {
      tag: '무료 배움터',
      title: '창업에듀(K-Startup 무료 온라인 아카데미)',
      benefit: '👉 세무, 지식재산권, 마케팅, 사업계획서 작성법 등 1,000여 개 전문 창업 실무 강의를 100% 무료 수강 및 수료증 발급',
      target: '창업에 관심 있는 청년, 직장인, 예비 사장님 누구나',
      url: 'https://www.k-startup.go.kr',
      btnText: '창업에듀 바로가기 ↗'
    },
    citizen_fair: {
      tag: '상생 소비',
      title: '대한민국 동행축제 & 상생마켓',
      benefit: '👉 봄, 가을, 겨울 시즌마다 전국 전통시장과 온·오프라인 쇼핑몰에서 우수 중소기업 제품을 파격 할인가에 구매',
      target: '가치소비와 착한 소비에 동참하고자 하는 일반 소비자',
      url: 'https://www.mss.go.kr',
      btnText: '동행축제 소식 ↗'
    },
    citizen_unfair: {
      tag: '권익 보호',
      title: '불공정거래 피해 구제 및 기술보호 핫라인',
      benefit: '👉 기술 탈취, 대금 미지급, 부당 반품 등 불공정 피해 발생 시 국선 대리인 무료 법률 지원 및 분쟁 조정',
      target: '대기업이나 거래처의 갑질 피해를 입은 기업인 및 국민',
      url: 'https://www.mss.go.kr',
      btnText: '불공정거래 신고센터 ↗'
    }
  };

  // 체크리스트 렌더링 함수
  const needsChecklist = document.getElementById('needsChecklist');
  const statusRadios = document.querySelectorAll('input[name="userStatus"]');

  function updateChecklist(status) {
    needsChecklist.innerHTML = '';
    const questions = checklistQuestions[status] || [];
    questions.forEach((q, idx) => {
      const checkItem = document.createElement('label');
      checkItem.className = 'check-item';
      checkItem.innerHTML = `
        <input type="checkbox" name="userNeed" value="${q.id}" ${idx === 0 ? 'checked' : ''}>
        <div class="check-info">
          <div class="check-title">${q.title}</div>
          <div class="check-desc">${q.desc}</div>
        </div>
      `;
      needsChecklist.appendChild(checkItem);
    });
  }

  // 신분 변경 시 체크리스트 갱신
  statusRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateChecklist(e.target.value);
      // 결과창이 열려있다면 닫아줌
      document.getElementById('diagnosisResult').style.display = 'none';
    });
  });

  // 초기 체크리스트 렌더링 (기본 soho)
  updateChecklist('soho');

  // 진단 버튼 클릭 이벤트
  const btnDiagnose = document.getElementById('btnDiagnose');
  const diagnosisResult = document.getElementById('diagnosisResult');
  const matchedResults = document.getElementById('matchedResults');
  const resultSummaryTitle = document.getElementById('resultSummaryTitle');
  const resultSummaryDesc = document.getElementById('resultSummaryDesc');

  btnDiagnose.addEventListener('click', () => {
    const selectedStatus = document.querySelector('input[name="userStatus"]:checked').value;
    const checkedBoxes = document.querySelectorAll('input[name="userNeed"]:checked');

    if (checkedBoxes.length === 0) {
      alert('최소 1개 이상의 고민/관심 항목을 체크해 주세요!');
      return;
    }

    const statusNames = {
      soho: '소상공인·자영업자 사장님',
      startup: '예비창업자 및 스타트업 대표님',
      sme: '중소기업 임직원 및 기업인',
      citizen: '일반 국민 및 소비자'
    };

    resultSummaryTitle.textContent = `🎯 ${statusNames[selectedStatus]}을 위한 맞춤 정책 지원 리포트`;
    resultSummaryDesc.textContent = `선택하신 ${checkedBoxes.length}가지 핵심 고민에 즉시 적용 가능한 중소벤처기업부의 솔루션입니다.`;

    matchedResults.innerHTML = '';

    checkedBoxes.forEach(cb => {
      const solution = solutionDatabase[cb.value];
      if (solution) {
        const card = document.createElement('div');
        card.className = 'matched-card';
        card.innerHTML = `
          <div>
            <div class="matched-tag">중기부 추천 ${solution.tag}</div>
            <h4 class="matched-title">${solution.title}</h4>
            <div class="matched-benefit">${solution.benefit}</div>
            <div class="matched-target"><strong>지원 대상:</strong> ${solution.target}</div>
          </div>
          <div>
            <a href="${solution.url}" target="_blank" rel="noopener noreferrer" class="matched-btn">
              ${solution.btnText}
            </a>
          </div>
        `;
        matchedResults.appendChild(card);
      }
    });

    diagnosisResult.style.display = 'block';
    // 결과 위치로 부드럽게 스크롤
    diagnosisResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // 초기화 버튼 이벤트
  const btnResetSurvey = document.getElementById('btnResetSurvey');
  btnResetSurvey.addEventListener('click', () => {
    const currentStatus = document.querySelector('input[name="userStatus"]:checked').value;
    updateChecklist(currentStatus);
    diagnosisResult.style.display = 'none';
    document.getElementById('survey-section').scrollIntoView({ behavior: 'smooth' });
  });


  // ==========================================
  // 기존 맞춤 정책 전체 둘러보기 데이터셋
  // ==========================================
  const policies = [
    {
      category: 'soho',
      tagText: '소상공인·자영업자',
      tagClass: 'tag-soho',
      title: '소상공인 금융 3종 세트 & 전환보증',
      desc: '고금리 장기화로 인한 상환 부담을 줄이기 위해 저금리 대환대출, 최대 3.2조 원 규모 전환보증 및 대환 거치기간을 제공합니다.',
      url: 'https://www.semas.or.kr'
    },
    {
      category: 'soho',
      tagText: '소상공인·골목상권',
      tagClass: 'tag-soho',
      title: '스마트상점 기술보급 사업',
      desc: '동네 상점의 디지털 전환을 위해 테이블오더, 키오스크, 서빙로봇, AI 도우미 도입 비용을 최대 70%까지 지원합니다.',
      url: 'https://www.sbiz.or.kr'
    },
    {
      category: 'startup',
      tagText: '예비창업자·스타트업',
      tagClass: 'tag-startup',
      title: 'TIPS (민관공동 창업지원) 프로그램',
      desc: '민간 투자사(운영사)가 선투자한 유망 기술 스타트업에 정부가 최대 5~7억 원의 R&D 및 사업화 자금을 연계 매칭합니다.',
      url: 'https://www.jointips.or.kr'
    },
    {
      category: 'startup',
      tagText: '스타트업·글로벌',
      tagClass: 'tag-startup',
      title: '글로벌 혁신특구 육성사업',
      desc: '신기술·신산업(바이오, 미래 모빌리티 등) 실증을 가로막는 규제를 전면 특례 적용하고 해외 인증 및 현지 진출을 패키지 지원합니다.',
      url: 'https://www.mss.go.kr'
    },
    {
      category: 'sme',
      tagText: '중소·제조기업',
      tagClass: 'tag-sme',
      title: '납품대금 연동제(하도급 원자재)',
      desc: '원자재 가격 상승분을 납품 대금에 의무 반영하여 하청 중소기업의 영업이익과 자금 유동성을 제도적으로 보호합니다.',
      url: 'https://www.mss.go.kr'
    },
    {
      category: 'sme',
      tagText: '중소·제조기업',
      tagClass: 'tag-sme',
      title: '중소기업 수출바우처 사업',
      desc: '해외 시장 개척에 필요한 바우처를 발급하여 디자인, 해외 규격 인증, 통번역, 글로벌 전시회 참가 등에 자유롭게 사용합니다.',
      url: 'https://www.exportvoucher.com'
    },
    {
      category: 'citizen',
      tagText: '일반 국민·소비자',
      tagClass: 'tag-citizen',
      title: '디지털 온누리상품권 10% 특별할인',
      desc: '전통시장 및 상점가에서 간편결제로 사용 가능한 온누리상품권을 상시 10% 할인 판매 및 명절 기간 환급 혜택을 제공합니다.',
      url: 'https://www.sbiz.or.kr'
    },
    {
      category: 'citizen',
      tagText: '일반 국민·창업희망자',
      tagClass: 'tag-citizen',
      title: '창업에듀(무료 창업 온라인 교육)',
      desc: '예비 창업자를 위한 세무, 회계, 사업계획서 작성, 지식재산권 보호 등 실무 강의를 누구나 무료로 수강할 수 있습니다.',
      url: 'https://www.k-startup.go.kr'
    }
  ];

  // 최신 뉴스 기사 및 보도자료 데이터셋
  const newsItems = [
    {
      source: '정책브리핑',
      date: '2025.01 / 연중 상시',
      title: '중기부, 소상공인 3.2조 원 규모 전환보증 공급 및 채무조정 본격 가동',
      summary: '고금리로 지친 자영업자들의 금융비용 부담을 줄이고 안정적인 영업을 돕기 위해 거치기간 연장 및 특별 대환대출 패키지를 본격 집행합니다.',
      link: 'https://www.korea.kr'
    },
    {
      source: '중기부 보도자료',
      date: '공식 정책 알림',
      title: '글로벌 유니콘 도약 위한 1.9조 원 벤처펀드 조성 및 모태펀드 출자 추진',
      summary: '위축된 벤처 생태계 활력을 되살리기 위해 AI, 딥테크, 시스템반도체 등 초격차 10대 분야에 정책자금을 집중 투입합니다.',
      link: 'https://www.mss.go.kr/site/smba/ex/bbs/List.do?cbIdx=86'
    },
    {
      source: '기업마당 뉴스',
      date: '중소기업 상생',
      title: '납품대금 연동제 현장 안착… 동행기업 1만 개 사 확산 추진',
      summary: '원자재 가격 변동 위험을 대기업과 중소기업이 함께 분담하는 납품대금 연동제가 산업 현장에 신속히 뿌리내릴 수 있도록 컨설팅을 지원합니다.',
      link: 'https://www.bizinfo.go.kr'
    },
    {
      source: '동행축제 소식',
      date: '소비 촉진',
      title: '대한민국 동행축제 & 디지털 온누리상품권 역대 최대 규모 발행',
      summary: '중소기업·소상공인 제품의 대규모 판로 확대와 국민 장바구니 부담 경감을 위한 전국 단위 할인 행사 및 모바일 상품권 혜택을 확대합니다.',
      link: 'https://www.mss.go.kr'
    },
    {
      source: 'K-스타트업',
      date: '글로벌 스타트업',
      title: '컴업(COMEUP) 및 글로벌 혁신특구 실증 본격화… 해외 VC 연계 지원',
      summary: '국내 기술 스타트업이 실리콘밸리, 유럽 등 해외 주요 혁신 거점으로 직진출할 수 있도록 규제 샌드박스와 글로벌 실증 비용을 지원합니다.',
      link: 'https://www.k-startup.go.kr'
    }
  ];

  // 맞춤 정책 렌더링 함수
  const policyGrid = document.getElementById('policyGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderPolicies(filter = 'all') {
    if (!policyGrid) return;
    policyGrid.innerHTML = '';
    const filtered = filter === 'all' 
      ? policies 
      : policies.filter(p => p.category === filter);

    filtered.forEach(policy => {
      const card = document.createElement('div');
      card.className = 'policy-item';
      card.innerHTML = `
        <div>
          <span class="policy-tag ${policy.tagClass}">${policy.tagText}</span>
          <h3 class="policy-title">${policy.title}</h3>
          <p class="policy-desc">${policy.desc}</p>
        </div>
        <div>
          <a href="${policy.url}" target="_blank" rel="noopener noreferrer" class="policy-link">
            자세히 알아보기 ↗
          </a>
        </div>
      `;
      policyGrid.appendChild(card);
    });
  }

  // 필터 버튼 클릭 이벤트
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-target');
      renderPolicies(target);
    });
  });

  // 최신 뉴스 렌더링 함수
  const newsList = document.getElementById('newsList');
  function renderNews() {
    if (!newsList) return;
    newsList.innerHTML = '';
    newsItems.forEach(news => {
      const newsCard = document.createElement('a');
      newsCard.className = 'news-card';
      newsCard.href = news.link;
      newsCard.target = '_blank';
      newsCard.rel = 'noopener noreferrer';
      newsCard.innerHTML = `
        <div class="news-info">
          <div class="news-meta">
            <span class="news-source">${news.source}</span>
            <span>${news.date}</span>
          </div>
          <div class="news-title">${news.title}</div>
          <div class="news-summary">${news.summary}</div>
        </div>
        <div class="news-arrow">↗</div>
      `;
      newsList.appendChild(newsCard);
    });
  }

  // 초기 렌더링 실행
  renderPolicies('all');
  renderNews();

  // 스무스 스크롤 네비게이션
  const navItems = document.querySelectorAll('.nav-links a, .hero-btns a');
  navItems.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
