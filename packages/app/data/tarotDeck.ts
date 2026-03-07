import { TarotCard } from '../types/card'

export const tarotDeck: TarotCard[] = [
  {
    id: 0,
    name: {
      en: 'The Fool',
      ko: '바보',
    },
    arcanaType: 'Major',
    suit: null,
    number: 0,
    imageDescription: {
      scene: '젊은 여행자가 절벽 끝에 서서 하늘을 바라보며 걸어가고 있습니다.',
      elements: [
        '하얀 장미가 든 지팡이를 들고 있음',
        '작은 하얀 개가 발치에서 뛰어놀고 있음',
        '화려한 옷을 입고 작은 보따리를 메고 있음',
        '밝은 노란 하늘을 배경으로 함'
      ],
      symbolism: [
        '절벽: 미지의 위험과 도전',
        '하얀 장미: 순수함과 순진무구함',
        '하얀 개: 충실한 보호자이자 본능',
        '보따리: 잠재력과 가능성'
      ]
    },
    upright: {
      keywords: ['새로운 시작', '자유', '모험'],
      description: '바보는 모험과 새로운 시작을 상징합니다.',
    },
    reversed: {
      keywords: ['무모함', '혼란', '위험'],
      description: '역방향의 바보는 무모한 결정과 혼란을 경고합니다.',
    },
  },
  {
    id: 1,
    name: {
      en: 'The Magician',
      ko: '마법사',
    },
    arcanaType: 'Major',
    suit: null,
    number: 1,
    imageDescription: {
      scene: '빨간 로브를 입은 마법사가 제단 앞에 서서 한 손은 하늘을, 다른 손은 땅을 가리키고 있습니다.',
      elements: [
        '머리 위의 무한대(∞) 기호',
        '제단 위의 검, 지팡이, 성배, 펜타클',
        '붉은 장미와 하얀 백합이 피어있는 정원',
        '금색 테이블'
      ],
      symbolism: [
        '무한대: 무한한 가능성과 잠재력',
        '네 가지 도구: 타로의 네 원소를 상징',
        '장미와 백합: 열정과 순수함의 조화',
        '한 손은 위로, 한 손은 아래로: As above, so below'
      ]
    },
    upright: {
      keywords: ['능력', '창조력', '기회'],
      description: '마법사는 자신의 재능을 활용하여 기회를 창조하는 능력을 상징합니다.',
    },
    reversed: {
      keywords: ['속임수', '실패', '자만심'],
      description: '역방향의 마법사는 자만심과 실패를 경고합니다.',
    },
  },
  {
    id: 2,
    name: {
      en: 'The High Priestess',
      ko: '여사제',
    },
    arcanaType: 'Major',
    suit: null,
    number: 2,
    imageDescription: {
      scene: '푸른 장막 사이에 여사제가 왕좌에 앉아있습니다.',
      elements: [
        '머리에 초승달 왕관을 쓰고 있음',
        '발 아래 초승달이 있음',
        '흰색과 검은색 기둥 사이에 위치',
        '무릎 위에 토라(성서)를 들고 있음',
        '뒤에는 석류와 종려나무가 그려진 베일'
      ],
      symbolism: [
        '초승달: 직관과 신비',
        '흑백 기둥: 이원성, 균형',
        '베일: 신비와 비밀',
        '토라: 신성한 지혜와 지식'
      ]
    },
    upright: {
      keywords: ['직관', '비밀', '내면'],
      description: '여사제는 직관과 내면의 지혜를 상징합니다.',
    },
    reversed: {
      keywords: ['착각', '억압', '불안'],
      description: '역방향의 여사제는 내면의 혼란을 경고합니다.',
    },
  },
  {
    id: 3,
    name: {
      en: 'The Empress',
      ko: '여제',
    },
    arcanaType: 'Major',
    suit: null,
    number: 3,
    imageDescription: {
      scene: '풍요로운 정원에서 여제가 편안한 자세로 왕좌에 앉아있습니다.',
      elements: [
        '금빛 곡식으로 장식된 왕관을 쓰고 있음',
        '하트 모양의 방패에 여성의 상징이 새겨져 있음',
        '푸른 물이 흐르는 폭포',
        '황금빛 곡식이 자라는 들판',
        '부드러운 쿠션이 있는 왕좌'
      ],
      symbolism: [
        '곡식: 풍요와 수확',
        '폭포: 감정의 흐름과 생명력',
        '정원: 자연과의 조화',
        '방패: 여성성과 보호'
      ]
    },
    upright: {
      keywords: ['풍요', '창조력', '모성'],
      description: '여제는 풍요로움과 창조력을 상징하며, 모성적인 사랑과 배려를 나타냅니다.',
    },
    reversed: {
      keywords: ['소진', '불안정', '창의력 부족'],
      description: '역방향의 여제는 창의력의 고갈과 불안정한 감정 상태를 나타냅니다.',
    },
  },
  {
    id: 4,
    name: {
      en: 'The Emperor',
      ko: '황제',
    },
    arcanaType: 'Major',
    suit: null,
    number: 4,
    imageDescription: {
      scene: '돌로 만든 왕좌에 황제가 위엄있게 앉아있습니다.',
      elements: [
        '양의 머리로 장식된 왕좌',
        '빨간 로브를 입고 있음',
        '금색 갑옷을 착용',
        '오른손에 앙크 지팡이를 들고 있음',
        '험준한 산맥을 배경으로 함'
      ],
      symbolism: [
        '돌 왕좌: 견고한 권위와 안정',
        '양: 전사의 기질과 지도력',
        '산맥: 불변의 힘과 견고함',
        '앙크 지팡이: 생명과 권위'
      ]
    },
    upright: {
      keywords: ['권위', '안정', '책임감'],
      description: '황제는 권위와 안정성을 상징하며, 강한 책임감을 나타냅니다.',
    },
    reversed: {
      keywords: ['독재', '불안정', '무책임'],
      description: '역방향의 황제는 독재적 성향과 불안정한 권력 남용을 경고합니다.',
    },
  },
  {
    id: 5,
    name: {
      en: 'The Hierophant',
      ko: '교황',
    },
    arcanaType: 'Major',
    suit: null,
    number: 5,
    imageDescription: {
      scene: '두 명의 성직자 사이에서 교황이 축복을 내리고 있습니다.',
      elements: [
        '삼중 왕관을 쓰고 있음',
        '오른손으로 축복의 제스처를 취함',
        '왼손에 삼중 십자가 지팡이를 들고 있음',
        '발 아래 두 개의 열쇠가 교차',
        '붉은 로브를 입은 두 성직자가 무릎 꿇고 있음'
      ],
      symbolism: [
        '삼중 왕관: 세 가지 세계에 대한 지배',
        '교차된 열쇠: 천국과 지상을 잇는 지식',
        '성직자들: 전통과 가르침의 전수',
        '축복의 손: 영적 지도력'
      ]
    },
    upright: {
      keywords: ['전통', '지식', '가르침'],
      description: '교황은 전통과 지식을 상징하며, 지혜를 통해 가르침을 전하는 역할을 합니다.',
    },
    reversed: {
      keywords: ['권위 거부', '반항', '독단'],
      description: '역방향의 교황은 전통에 대한 거부감과 반항적인 태도를 나타냅니다.',
    },
  },
  {
    id: 6,
    name: {
      en: 'The Lovers',
      ko: '연인',
    },
    arcanaType: 'Major',
    suit: null,
    number: 6,
    imageDescription: {
      scene: '에덴동산에서 나체의 남녀가 서로를 마주보고 있고, 그 위로 천사가 날개를 펼치고 있습니다.',
      elements: [
        '태양이 비치는 에덴동산',
        '여자 뒤의 지식의 나무와 뱀',
        '남자 뒤의 불타는 12개의 나무',
        '축복을 내리는 대천사 라파엘',
        '구름 위의 천사'
      ],
      symbolism: [
        '에덴동산: 순수한 사랑과 선택의 순간',
        '지식의 나무: 유혹과 선택',
        '천사: 신성한 축복과 보호',
        '나체의 남녀: 있는 그대로의 순수함'
      ]
    },
    upright: {
      keywords: ['사랑', '조화', '결정'],
      description: '연인은 사랑과 조화를 상징하며, 중요한 결정을 내리는 순간을 나타냅니다.',
    },
    reversed: {
      keywords: ['불화', '갈등', '잘못된 선택'],
      description: '역방향의 연인은 갈등과 불화를 경고하며, 잘못된 선택을 경계해야 함을 나타냅니다.',
    },
  },
  {
    id: 7,
    name: {
      en: 'The Chariot',
      ko: '전차',
    },
    arcanaType: 'Major',
    suit: null,
    number: 7,
    imageDescription: {
      scene: '갑옷을 입은 전사가 스핑크스가 끄는 전차를 타고 있습니다.',
      elements: [
        '검은 스핑크스와 흰 스핑크스가 전차를 끌고 있음',
        '별이 그려진 천개가 있는 전차',
        '왕관을 쓴 전사',
        '어깨의 초승달 문양',
        '도시의 성벽을 배경으로 함'
      ],
      symbolism: [
        '스핑크스: 대립되는 힘의 조화',
        '전차: 의지와 승리',
        '왕관: 성공과 정복',
        '초승달: 직관과 보호'
      ]
    },
    upright: {
      keywords: ['의지', '결단력', '승리'],
      description: '전차는 강한 의지와 결단력을 통해 승리하는 것을 상징합니다.',
    },
    reversed: {
      keywords: ['혼란', '실패', '자제력 부족'],
      description: '역방향의 전차는 혼란과 자제력 부족으로 인한 실패를 경고합니다.',
    },
  },
  {
    id: 8,
    name: {
      en: 'Strength',
      ko: '힘',
    },
    arcanaType: 'Major',
    suit: null,
    number: 8,
    imageDescription: {
      scene: '하얀 드레스를 입은 여인이 사자의 입을 부드럽게 닫고 있습니다.',
      elements: [
        '머리 위의 무한대(∞) 기호',
        '하얀 드레스를 입은 여인',
        '붉은 사자',
        '꽃으로 장식된 허리띠',
        '푸른 산을 배경으로 함'
      ],
      symbolism: [
        '사자: 내면의 야성적 본능',
        '여인: 내적 힘과 부드러움',
        '무한대: 영원한 힘',
        '하얀 드레스: 순수한 의도'
      ]
    },
    upright: {
      keywords: ['용기', '인내', '내적 힘'],
      description: '힘 카드는 용기와 인내, 그리고 내면의 강인함을 상징합니다.',
    },
    reversed: {
      keywords: ['약함', '두려움', '자신감 부족'],
      description: '역방향의 힘 카드는 자신감 부족과 두려움을 경고합니다.',
    },
  },
  {
    id: 9,
    name: {
      en: 'The Hermit',
      ko: '은둔자',
    },
    arcanaType: 'Major',
    suit: null,
    number: 9,
    imageDescription: {
      scene: '노인이 눈 덮인 산 정상에서 지팡이와 등불을 들고 서 있습니다.',
      elements: [
        '회색 수도복을 입은 노인',
        '육각별이 그려진 등불',
        '지혜의 지팡이',
        '눈 덮인 산봉우리',
        '어두운 하늘'
      ],
      symbolism: [
        '등불: 내면의 빛과 지혜',
        '지팡이: 영적 권위와 지지',
        '수도복: 겸손과 고독',
        '산: 영적 고양과 고립'
      ]
    },
    upright: {
      keywords: ['고독', '명상', '내면 탐구'],
      description: '은둔자는 고독 속에서 명상하며 내면을 탐구하는 것을 상징합니다.',
    },
    reversed: {
      keywords: ['외로움', '고립', '자기중심적'],
      description: '역방향의 은둔자는 고립과 자기중심적인 태도를 경고합니다.',
    },
  },
  {
    id: 10,
    name: {
      en: 'The Wheel of Fortune',
      ko: '운명의 수레바퀴',
    },
    arcanaType: 'Major',
    suit: null,
    number: 10,
    imageDescription: {
      scene: '천사들이 둘러싼 가운데 거대한 운명의 수레바퀴가 회전하고 있습니다.',
      elements: [
        '히브리어 문자가 새겨진 수레바퀴',
        '네 모서리의 천사들',
        '스핑크스가 왕좌에 앉아있음',
        '뱀이 수레바퀴 왼쪽으로 내려가고 있음',
        '아누비스가 수레바퀴를 올라가고 있음'
      ],
      symbolism: [
        '수레바퀴: 운명의 순환',
        '천사들: 우주의 네 원소',
        '스핑크스: 안정과 지혜',
        '뱀과 아누비스: 상승과 하강의 순환'
      ]
    },
    upright: {
      keywords: ['변화', '행운', '순환'],
      description: '운명의 수레바퀴는 변화와 행운, 그리고 삶의 순환을 상징합니다.',
    },
    reversed: {
      keywords: ['불운', '예기치 않은 변화', '저항'],
      description: '역방향의 운명의 수레바퀴는 불운과 예기치 않은 변화를 경고합니다.',
    },
  },
  {
    id: 11,
    name: {
      en: 'Justice',
      ko: '정의',
    },
    arcanaType: 'Major',
    suit: null,
    number: 11,
    imageDescription: {
      scene: '왕좌에 앉은 정의의 여신이 저울과 검을 들고 있습니다.',
      elements: [
        '금색 저울을 든 왼손',
        '들어올린 검을 든 오른손',
        '자주색 망토',
        '두 기둥 사이의 왕좌',
        '왕관을 쓴 여신'
      ],
      symbolism: [
        '저울: 공정과 균형',
        '검: 결단과 진실',
        '왕관: 최종 판단의 권위',
        '자주색 망토: 위엄과 공정성'
      ]
    },
    upright: {
      keywords: ['공정', '균형', '진실'],
      description: '정의 카드는 공정함과 균형, 진실을 상징합니다.',
    },
    reversed: {
      keywords: ['불공정', '불균형', '불신'],
      description: '역방향의 정의 카드는 불공정함과 불균형을 경고합니다.',
    },
  },
  {
    id: 12,
    name: {
      en: 'The Hanged Man',
      ko: '매달린 사람',
    },
    arcanaType: 'Major',
    suit: null,
    number: 12,
    imageDescription: {
      scene: '한 남자가 T자형 나무에 한 발로 거꾸로 매달려 있습니다.',
      elements: [
        '한 발이 묶인 채 거꾸로 매달린 남자',
        '빛나는 후광이 있는 머리',
        '팔을 등 뒤로 한 자세',
        '평화로운 표정',
        '녹색 나뭇잎이 있는 배경'
      ],
      symbolism: [
        '거꾸로 매달린 자세: 새로운 관점',
        '후광: 깨달음과 지혜',
        'T자형 나무: 고난과 희생',
        '평화로운 표정: 자발적 희생'
      ]
    },
    upright: {
      keywords: ['희생', '양보', '관점 변화'],
      description: '매달린 사람은 희생과 양보, 그리고 새로운 관점을 상징합니다.',
    },
    reversed: {
      keywords: ['고집', '정체', '변화 거부'],
      description: '역방향의 매달린 사람은 고집과 정체, 변화에 대한 거부를 나타냅니다.',
    },
  },
  {
    id: 13,
    name: {
      en: 'Death',
      ko: '죽음',
    },
    arcanaType: 'Major',
    suit: null,
    number: 13,
    imageDescription: {
      scene: '검은 갑옷을 입은 해골 기사가 하얀 말을 타고 있습니다.',
      elements: [
        '검은 갑옷의 해골 기사',
        '하얀 장미가 그려진 깃발',
        '죽은 왕이 누워있는 땅',
        '떠오르는 태양',
        '강 너머로 보이는 쌍탑'
      ],
      symbolism: [
        '해골 기사: 변화의 불가피성',
        '하얀 장미: 순수한 변화와 새로운 시작',
        '떠오르는 태양: 재생과 희망',
        '쌍탑: 새로운 목적지'
      ]
    },
    upright: {
      keywords: ['종말', '변화', '재생'],
      description: '죽음 카드는 종말과 새로운 시작, 변화와 재생을 상징합니다.',
    },
    reversed: {
      keywords: ['저항', '두려움', '정체'],
      description: '역방향의 죽음 카드는 변화에 대한 저항과 두려움을 나타냅니다.',
    },
  },
  {
    id: 14,
    name: {
      en: 'Temperance',
      ko: '절제',
    },
    arcanaType: 'Major',
    suit: null,
    number: 14,
    imageDescription: {
      scene: '천사가 두 개의 성배 사이로 물을 부어 섞고 있습니다.',
      elements: [
        '무지개 빛 날개를 가진 천사',
        '한 발은 물에, 한 발은 땅에 두고 서있음',
        '두 개의 금색 성배',
        '이리스 꽃이 피어있는 길',
        '산을 배경으로 한 일몰'
      ],
      symbolism: [
        '물 흐름: 감정의 균형과 조화',
        '한 발씩 다른 곳에: 현실과 영적 세계의 조화',
        '성배: 의식적, 무의식적 마음',
        '일몰: 영적 깨달음'
      ]
    },
    upright: {
      keywords: ['조화', '인내', '균형'],
      description: '절제 카드는 조화와 인내, 균형을 상징합니다.',
    },
    reversed: {
      keywords: ['무절제', '혼란', '불균형'],
      description: '역방향의 절제는 무절제와 혼란, 불균형을 나타냅니다.',
    },
  },
  {
    id: 15,
    name: {
      en: 'The Devil',
      ko: '악마',
    },
    arcanaType: 'Major',
    suit: null,
    number: 15,
    imageDescription: {
      scene: '박쥐 날개를 가진 악마가 제단 위에 앉아있고, 그 아래 두 사람이 사슬에 묶여 있습니다.',
      elements: [
        '박쥐 날개와 염소 뿔을 가진 악마',
        '거꾸로 된 오각별',
        '제단에 묶인 나체의 남녀',
        '느슨한 사슬',
        '횃불을 든 악마의 손'
      ],
      symbolism: [
        '사슬: 물질적 욕망의 속박',
        '느슨한 사슬: 자발적 구속',
        '횃불: 그릇된 깨달음',
        '염소 뿔: 물질적 욕망'
      ]
    },
    upright: {
      keywords: ['유혹', '속박', '물질주의'],
      description: '악마 카드는 유혹과 속박, 물질적인 집착을 상징합니다.',
    },
    reversed: {
      keywords: ['해방', '자유', '집착의 종말'],
      description: '역방향의 악마는 속박에서 해방되고 자유를 찾는 것을 나타냅니다.',
    },
  },
  {
    id: 16,
    name: {
      en: 'The Tower',
      ko: '탑',
    },
    arcanaType: 'Major',
    suit: null,
    number: 16,
    imageDescription: {
      scene: '번개에 맞은 탑이 불타고 있고, 사람들이 탑에서 떨어지고 있습니다.',
      elements: [
        '번개에 맞은 높은 탑',
        '떨어지는 사람들',
        '불타는 왕관',
        '검은 구름',
        '번쩍이는 번개'
      ],
      symbolism: [
        '번개: 갑작스러운 깨달음과 파괴',
        '떨어지는 사람들: 기존 가치관의 붕괴',
        '불타는 왕관: 허상의 파괴',
        '탑: 자만심과 거짓된 구조물'
      ]
    },
    upright: {
      keywords: ['혼란', '붕괴', '변화'],
      description: '탑 카드는 예기치 않은 변화와 붕괴를 상징합니다.',
    },
    reversed: {
      keywords: ['저항', '비극 회피', '불안'],
      description: '역방향의 탑은 변화에 대한 저항과 비극을 회피하려는 시도를 나타냅니다.',
    },
  },
  {
    id: 17,
    name: {
      en: 'The Star',
      ko: '별',
    },
    arcanaType: 'Major',
    suit: null,
    number: 17,
    imageDescription: {
      scene: '나체의 여인이 한 쪽 발은 물에, 한 쪽 발은 땅에 두고 물을 붓고 있습니다.',
      elements: [
        '큰 중앙의 별과 일곱 개의 작은 별들',
        '두 개의 물병으로 물을 붓는 여인',
        '이비스 새',
        '꽃이 피어있는 나무',
        '고요한 연못'
      ],
      symbolism: [
        '별들: 영적 인도와 희망',
        '물을 붓는 행위: 영감과 치유',
        '나체: 순수함과 취약성',
        '이비스: 지혜와 영적 메시지'
      ]
    },
    upright: {
      keywords: ['희망', '영감', '치유'],
      description: '별 카드는 희망과 영감, 치유를 상징합니다.',
    },
    reversed: {
      keywords: ['절망', '실망', '무기력'],
      description: '역방향의 별은 절망과 실망, 무기력을 경고합니다.',
    },
  },
  {
    id: 18,
    name: {
      en: 'The Moon',
      ko: '달',
    },
    arcanaType: 'Major',
    suit: null,
    number: 18,
    imageDescription: {
      scene: '보름달 아래 두 마리의 개가 울부짖고, 가재가 물에서 기어 나오고 있습니다.',
      elements: [
        '얼굴이 있는 보름달',
        '울부짖는 늑대와 개',
        '물에서 나오는 가재',
        '두 개의 탑이 있는 길',
        '이슬방울을 떨어뜨리는 달'
      ],
      symbolism: [
        '달: 무의식과 환상',
        '늑대와 개: 야생과 길들여진 본능',
        '가재: 무의식에서 의식으로의 여정',
        '탑: 미지의 세계로 가는 관문'
      ]
    },
    upright: {
      keywords: ['환상', '직관', '불확실성'],
      description: '달 카드는 환상과 직관, 불확실성을 상징합니다.',
    },
    reversed: {
      keywords: ['혼란', '불안', '환멸'],
      description: '역방향의 달은 혼란과 불안, 환멸을 경고합니다.',
    },
  },
  {
    id: 19,
    name: {
      en: 'The Sun',
      ko: '태양',
    },
    arcanaType: 'Major',
    suit: null,
    number: 19,
    imageDescription: {
      scene: '해바라기 정원에서 아이가 하얀 말을 타고 즐겁게 놀고 있습니다.',
      elements: [
        '얼굴이 있는 밝은 태양',
        '하얀 말을 탄 아이',
        '붉은 깃발을 든 손',
        '해바라기 정원',
        '석조 벽'
      ],
      symbolism: [
        '태양: 진실과 명료함',
        '아이: 순수한 기쁨과 자유',
        '하얀 말: 순수한 영혼',
        '해바라기: 생명력과 성장'
      ]
    },
    upright: {
      keywords: ['성공', '행복', '성취'],
      description: '태양 카드는 성공과 행복, 성취를 상징합니다.',
    },
    reversed: {
      keywords: ['좌절', '실패', '낙담'],
      description: '역방향의 태양은 좌절과 실패, 낙담을 경고합니다.',
    },
  },
  {
    id: 20,
    name: {
      en: 'Judgement',
      ko: '심판',
    },
    arcanaType: 'Major',
    suit: null,
    number: 20,
    imageDescription: {
      scene: '천사 가브리엘이 나팔을 불고, 무덤에서 사람들이 일어나고 있습니다.',
      elements: [
        '황금 나팔을 부는 천사',
        '무덤에서 일어나는 나체의 사람들',
        '높이 솟은 산맥',
        '하늘에서 내리는 빛',
        '십자가가 그려진 깃발'
      ],
      symbolism: [
        '나팔: 각성과 부름',
        '부활하는 사람들: 새로운 시작',
        '산맥: 도전과 성취',
        '빛: 신성한 계시'
      ]
    },
    upright: {
      keywords: ['부활', '결단', '명확성'],
      description: '심판 카드는 부활과 결단, 명확한 결정을 상징합니다.',
    },
    reversed: {
      keywords: ['후회', '미결정', '혼란'],
      description: '역방향의 심판은 후회와 결정을 내리지 못하는 혼란을 경고합니다.',
    },
  },
  {
    id: 21,
    name: {
      en: 'The World',
      ko: '세계',
    },
    arcanaType: 'Major',
    suit: null,
    number: 21,
    imageDescription: {
      scene: '월계수 화환 안에서 나체의 여인이 춤추고 있고, 네 모서리에 네 생물이 있습니다.',
      elements: [
        '보라색 천을 두른 춤추는 여인',
        '녹색 월계수 화환',
        '네 모서리의 천사, 독수리, 황소, 사자',
        '손에 든 두 개의 지팡이',
        '구름이 있는 푸른 하늘'
      ],
      symbolism: [
        '화환: 완성과 성취의 순환',
        '네 생물: 우주의 네 원소와 복음서 저자',
        '춤추는 여인: 완성된 영혼',
        '지팡이: 균형과 조화'
      ]
    },
    upright: {
      keywords: ['완성', '성취', '통합'],
      description: '세계 카드는 완성과 성취, 통합을 상징합니다.',
    },
    reversed: {
      keywords: ['미완성', '지연', '중단'],
      description: '역방향의 세계 카드는 미완성과 지연을 경고합니다.',
    },
  },
  {
    id: 22,
    name: {
      en: 'Ace of Cups',
      ko: '컵의 에이스',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 1,
    imageDescription: {
      scene: '구름 속에서 나온 손이 성배를 들고 있고, 그 위로 비둘기가 성체를 물고 있습니다.',
      elements: [
        '하늘에서 내려온 손이 든 황금 성배',
        '성배에서 넘치는 다섯 줄기의 물',
        '성체를 물고 있는 하얀 비둘기',
        '잔잔한 호수 위의 연꽃',
        '푸른 하늘과 흰 구름'
      ],
      symbolism: [
        '성배: 감정과 사랑의 그릇',
        '넘치는 물: 풍부한 감정과 영감',
        '비둘기: 평화와 순수한 사랑',
        '연꽃: 영적 순수함'
      ]
    },
    upright: {
      keywords: ['사랑', '감정', '새로운 시작'],
      description: '컵의 에이스는 사랑과 감정의 풍요로움을 상징하며, 새로운 시작을 나타냅니다.',
    },
    reversed: {
      keywords: ['감정 억제', '사랑의 실패', '실망'],
      description: '역방향의 컵의 에이스는 감정 억제와 사랑에서의 실패를 경고합니다.',
    },
  },
  {
    id: 23,
    name: {
      en: 'Two of Cups',
      ko: '컵의 2',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 2,
    imageDescription: {
      scene: '남녀가 서로를 마주보며 각자의 성배를 교환하고 있습니다.',
      elements: [
        '서로를 바라보는 남녀',
        '두 개의 황금 성배',
        '머리 위의 카두세우스 지팡이',
        '빨간 날개를 가진 사자 문양',
        '푸른 언덕을 배경으로 함'
      ],
      symbolism: [
        '성배 교환: 감정의 교류',
        '카두세우스: 조화와 치유',
        '사자: 열정과 힘',
        '푸른 배경: 평화로운 관계'
      ]
    },
    upright: {
      keywords: ['파트너십', '조화', '연결'],
      description: '컵의 2는 파트너십과 조화를 상징하며, 두 사람 간의 강한 연결을 나타냅니다.',
    },
    reversed: {
      keywords: ['불일치', '이별', '갈등'],
      description: '역방향의 컵의 2는 불일치와 이별을 경고합니다.',
    },
  },
  {
    id: 24,
    name: {
      en: 'Three of Cups',
      ko: '컵의 3',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 3,
    imageDescription: {
      scene: '세 여인이 원을 그리며 춤추고 있고, 각자 성배를 들어 올리고 있습니다.',
      elements: [
        '화환을 쓴 세 여인',
        '들어 올린 세 개의 성배',
        '과일과 꽃이 가득한 정원',
        '축하하는 듯한 자세',
        '밝은 노란색 하늘'
      ],
      symbolism: [
        '세 여인: 우정과 축하',
        '성배: 감정의 공유',
        '풍성한 과일: 풍요와 기쁨',
        '춤추는 모습: 즐거움과 조화'
      ]
    },
    upright: {
      keywords: ['축하', '우정', '모임'],
      description: '컵의 3는 축하와 우정을 상징하며, 즐거운 모임을 나타냅니다.',
    },
    reversed: {
      keywords: ['소외', '외로움', '사회적 갈등'],
      description: '역방향의 컵의 3는 소외와 외로움을 경고합니다.',
    },
  },
  {
    id: 25,
    name: {
      en: 'Four of Cups',
      ko: '컵의 4',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 4,
    imageDescription: {
      scene: '젊은이가 나무 아래 앉아 명상하고 있고, 구름 속 손이 네 번째 성배를 건네고 있습니다.',
      elements: [
        '나무 아래 앉아있는 젊은이',
        '땅에 놓인 세 개의 성배',
        '구름 속 손이 건네는 네 번째 성배',
        '푸른 언덕',
        '젊은이의 팔짱 낀 자세'
      ],
      symbolism: [
        '명상하는 자세: 내적 성찰',
        '무시된 성배들: 현재 상황에 대한 불만족',
        '새로 제시되는 성배: 새로운 기회',
        '나무: 보호와 안정'
      ]
    },
    upright: {
      keywords: ['명상', '재평가', '만족하지 않음'],
      description: '컵의 4는 명상과 재평가를 상징하며, 현재 상황에 만족하지 못하는 상태를 나타냅니다.',
    },
    reversed: {
      keywords: ['기회 포착', '새로운 통찰력', '무관심 해소'],
      description: '역방향의 컵의 4는 새로운 기회를 포착하고 무관심에서 벗어나는 것을 상징합니다.',
    },
  },
  {
    id: 26,
    name: {
      en: 'Five of Cups',
      ko: '컵의 5',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 5,
    imageDescription: {
      scene: '검은 망토를 입은 인물이 쓰러진 세 개의 성배를 바라보고 있고, 뒤에는 두 개의 성배가 서있습니다.',
      elements: [
        '검은 망토를 입은 슬픈 인물',
        '쏟아진 세 개의 성배',
        '서있는 두 개의 성배',
        '다리로 이어진 성',
        '흐린 하늘과 강'
      ],
      symbolism: [
        '쏟아진 성배: 상실과 후회',
        '남은 성배: 희망과 기회',
        '다리: 새로운 가능성으로의 통로',
        '검은 망토: 슬픔과 애도'
      ]
    },
    upright: {
      keywords: ['후회', '슬픔', '손실'],
      description: '컵의 5는 후회와 슬픔, 손실을 상징합니다.',
    },
    reversed: {
      keywords: ['회복', '용서', '새로운 시작'],
      description: '역방향의 컵의 5는 회복과 용서, 새로운 시작을 나타냅니다.',
    },
  },
  {
    id: 27,
    name: {
      en: 'Six of Cups',
      ko: '컵의 6',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 6,
    imageDescription: {
      scene: '한 아이가 다른 아이에게 꽃이 담긴 성배를 건네주고 있는 정원의 모습입니다.',
      elements: [
        '금발의 두 아이들',
        '꽃이 담긴 여섯 개의 성배',
        '중세풍의 정원',
        '뒤쪽의 경비병',
        '돌로 된 성벽과 건물'
      ],
      symbolism: [
        '아이들: 순수함과 과거의 추억',
        '꽃이 담긴 성배: 순수한 감정과 선물',
        '정원: 보호받는 공간, 어린 시절',
        '경비병: 보호와 안전'
      ]
    },
    upright: {
      keywords: ['추억', '순수', '과거 회상'],
      description: '컵의 6은 추억과 순수를 상징하며, 과거를 회상하는 것을 나타냅니다.',
    },
    reversed: {
      keywords: ['과거에 얽매임', '집착', '진행되지 않는 상태'],
      description: '역방향의 컵의 6은 과거에 얽매이고 발전이 없는 상태를 경고합니다.',
    },
  },
  {
    id: 28,
    name: {
      en: 'Seven of Cups',
      ko: '컵의 7',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 7,
    imageDescription: {
      scene: '구름 속에 일곱 개의 성배가 떠 있고, 각각의 성배에서 다른 환영이 나타납니다.',
      elements: [
        '일곱 개의 황금 성배',
        '성배 속 뱀, 성, 보석, 월계관, 용, 얼굴, 천으로 덮인 형상',
        '어두운 구름',
        '황금빛 하늘',
        '그림자 속의 인물'
      ],
      symbolism: [
        '다양한 환영: 선택과 가능성',
        '구름: 혼란과 불확실성',
        '일곱 성배: 다양한 욕망과 꿈',
        '그림자 인물: 결정을 앞둔 자아'
      ]
    },
    upright: {
      keywords: ['환상', '다양한 선택', '상상력'],
      description: '컵의 7은 환상과 선택의 다양성을 상징하며, 상상력을 자극합니다.',
    },
    reversed: {
      keywords: ['혼란 해소', '실질적 선택', '결정'],
      description: '역방향의 컵의 7은 혼란이 해소되고 실질적인 선택을 하는 것을 나타냅니다.',
    },
  },
  {
    id: 29,
    name: {
      en: 'Eight of Cups',
      ko: '컵의 8',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 8,
    imageDescription: {
      scene: '한 인물이 쌓여있는 성배들을 뒤로 하고 달빛 아래 산길을 떠나고 있습니다.',
      elements: [
        '여덟 개의 쌓인 성배',
        '달빛 아래 떠나는 순례자',
        '험준한 산길',
        '초승달과 보름달',
        '강물이 흐르는 계곡'
      ],
      symbolism: [
        '떠나는 순례자: 영적 추구와 포기',
        '쌓인 성배: 현재의 성취와 안정',
        '달: 직관과 내면의 부름',
        '산길: 새로운 도전과 여정'
      ]
    },
    upright: {
      keywords: ['떠남', '포기', '탐구'],
      description: '컵의 8은 현재 상황을 떠나고 새로운 탐구를 시작하는 것을 상징합니다.',
    },
    reversed: {
      keywords: ['머무름', '회피', '불확실성'],
      description: '역방향의 컵의 8은 떠나지 못하고 머무르며, 불확실성을 경고합니다.',
    },
  },
  {
    id: 30,
    name: {
      en: 'Nine of Cups',
      ko: '컵의 9',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 9,
    imageDescription: {
      scene: '만족스러운 표정의 남자가 곡선으로 배열된 아홉 개의 성배 앞에 앉아있습니다.',
      elements: [
        '곡선으로 배열된 아홉 개의 황금 성배',
        '푸른 벤치에 앉은 남자',
        '붉은 모자와 의복을 입은 인물',
        '팔짱을 낀 자세',
        '화려한 목재 바닥'
      ],
      symbolism: [
        '곡선 배열: 풍요와 성취의 완성',
        '만족스러운 표정: 소원 성취',
        '팔짱 낀 자세: 자신감과 만족',
        '화려한 배경: 물질적 성공'
      ]
    },
    upright: {
      keywords: ['성취', '만족', '감정적 풍요'],
      description: '컵의 9는 성취와 만족, 감정적 풍요로움을 상징합니다.',
    },
    reversed: {
      keywords: ['자만', '과도한 만족', '공허함'],
      description: '역방향의 컵의 9는 과도한 자만과 공허함을 경고합니다.',
    },
  },
  {
    id: 31,
    name: {
      en: 'Ten of Cups',
      ko: '컵의 10',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 10,
    imageDescription: {
      scene: '무지개 아래에서 행복한 가족이 서로를 바라보며 기뻐하고 있습니다.',
      elements: [
        '손을 맞잡은 부부',
        '뛰어노는 두 아이',
        '열 개의 황금 성배로 이루어진 무지개',
        '평화로운 시골 마을',
        '아늑한 집과 강'
      ],
      symbolism: [
        '무지개: 축복과 약속',
        '행복한 가족: 완벽한 정서적 만족',
        '평화로운 풍경: 조화와 안정',
        '집: 안정된 가정'
      ]
    },
    upright: {
      keywords: ['가족', '행복', '성취'],
      description: '컵의 10은 가족과 행복, 성취를 상징합니다.',
    },
    reversed: {
      keywords: ['불화', '분열', '행복의 부족'],
      description: '역방향의 컵의 10은 불화와 분열, 행복의 부족을 나타냅니다.',
    },
  },
  {
    id: 32,
    name: {
      en: 'Page of Cups',
      ko: '컵의 페이지',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 11,
    imageDescription: {
      scene: '젊은 시인이 성배에서 튀어나온 물고기를 바라보며 서 있습니다.',
      elements: [
        '푸른 튜닉을 입은 젊은이',
        '성배에서 튀어나온 물고기',
        '꽃무늬 장식의 의상',
        '바다와 모래사장',
        '부드러운 구름이 있는 하늘'
      ],
      symbolism: [
        '물고기: 창의성과 영감',
        '성배: 감정과 직관',
        '바다: 무의식의 세계',
        '젊은이의 표정: 놀라움과 호기심'
      ]
    },
    upright: {
      keywords: ['상상력', '직관', '새로운 감정'],
      description: '컵의 페이지는 상상력과 직관, 새로운 감정의 시작을 상징합니다.',
    },
    reversed: {
      keywords: ['감정적 미성숙', '혼란', '환상'],
      description: '역방향의 컵의 페이지는 감정적 미성숙과 혼란을 경고합니다.',
    },
  },
  {
    id: 33,
    name: {
      en: 'Knight of Cups',
      ko: '컵의 기사',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 12,
    imageDescription: {
      scene: '하얀 말을 탄 기사가 성배를 들고 천천히 앞으로 나아가고 있습니다.',
      elements: [
        '푸른 날개 장식이 있는 투구',
        '성배를 든 기사',
        '하얀 말',
        '강과 산이 있는 풍경',
        '물고기 문양의 망토'
      ],
      symbolism: [
        '하얀 말: 순수한 의도',
        '성배: 로맨틱한 제안',
        '물고기 문양: 창의성과 감성',
        '천천히 가는 모습: 신중한 접근'
      ]
    },
    upright: {
      keywords: ['로맨스', '제안', '모험'],
      description: '컵의 기사는 로맨스와 제안을 상징하며, 감정적 모험을 나타냅니다.',
    },
    reversed: {
      keywords: ['현실 도피', '실망', '불성실'],
      description: '역방향의 컵의 기사는 현실 도피와 실망을 경고합니다.',
    },
  },
  {
    id: 34,
    name: {
      en: 'Queen of Cups',
      ko: '컵의 여왕',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 13,
    imageDescription: {
      scene: '바다가 내려다보이는 왕좌에 앉아 성배를 바라보는 여왕입니다.',
      elements: [
        '화려하게 장식된 성배를 든 여왕',
        '조개 모양의 왕좌',
        '물가의 바위',
        '잔잔한 바다',
        '구름이 있는 하늘'
      ],
      symbolism: [
        '성배: 깊은 감정과 직관',
        '바다: 무의식과 감정의 깊이',
        '조개 왕좌: 감성의 보호',
        '구름: 꿈과 상상력'
      ]
    },
    upright: {
      keywords: ['감정적 안정', '직관', '돌봄'],
      description: '컵의 여왕은 감정적 안정과 돌봄, 직관을 상징합니다.',
    },
    reversed: {
      keywords: ['감정적 불안정', '과잉 감정', '의존'],
      description: '역방향의 컵의 여왕은 감정적 불안정과 과잉 감정을 경고합니다.',
    },
  },
  {
    id: 35,
    name: {
      en: 'King of Cups',
      ko: '컵의 왕',
    },
    arcanaType: 'Minor',
    suit: 'Cup',
    number: 14,
    imageDescription: {
      scene: '폭풍우 치는 바다 위에서 왕이 성배를 들고 평온하게 앉아있습니다.',
      elements: [
        '화려한 왕관과 망토를 입은 왕',
        '오른손에 든 성배',
        '왼손에 든 지팡이',
        '파도치는 바다',
        '물 위를 달리는 물고기'
      ],
      symbolism: [
        '폭풍 속의 평온: 감정적 통제',
        '성배: 감정의 지혜',
        '지팡이: 권위와 통제력',
        '물고기: 창의성과 직관'
      ]
    },
    upright: {
      keywords: ['감정의 균형', '지혜', '동정심'],
      description: '컵의 왕은 감정의 균형과 지혜, 동정심을 상징합니다.',
    },
    reversed: {
      keywords: ['감정적 억압', '냉소', '비합리적'],
      description: '역방향의 컵의 왕은 감정적 억압과 비합리적 판단을 경고합니다.',
    },
  },
  {
    id: 36,
    name: {
      en: 'Ace of Pentacles',
      ko: '펜타클의 에이스',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 1,
    imageDescription: {
      scene: '구름 사이로 나온 손이 황금 펜타클을 들고 있고, 아래에는 정원이 있습니다.',
      elements: [
        '구름 속의 손이 든 황금 펜타클',
        '아치형 꽃길',
        '만발한 하얀 백합',
        '푸른 산과 정원',
        '멀리 보이는 성문'
      ],
      symbolism: [
        '펜타클: 물질적 기회와 번영',
        '정원: 성장과 번영의 가능성',
        '꽃길: 성공으로 가는 길',
        '성문: 새로운 기회'
      ]
    },
    upright: {
      keywords: ['물질적 시작', '기회', '번영'],
      description: '펜타클의 에이스는 물질적 번영과 기회를 상징합니다.',
    },
    reversed: {
      keywords: ['기회의 상실', '재정적 불안', '낭비'],
      description: '역방향의 펜타클의 에이스는 기회의 상실과 재정적 불안을 경고합니다.',
    },
  },
  {
    id: 37,
    name: {
      en: 'Two of Pentacles',
      ko: '펜타클의 2',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 2,
    imageDescription: {
      scene: '한 젊은이가 두 개의 펜타클을 무한대 모양으로 저글링하고 있습니다.',
      elements: [
        '두 개의 펜타클을 저글링하는 무용수',
        '무한대 모양의 리본',
        '파도치는 바다',
        '항해하는 두 척의 배',
        '화려한 의상을 입은 인물'
      ],
      symbolism: [
        '저글링: 균형과 적응력',
        '무한대 리본: 끊임없는 변화와 순환',
        '파도치는 바다: 감정의 기복',
        '항해하는 배: 인생의 여정'
      ]
    },
    upright: {
      keywords: ['균형', '적응', '유연성'],
      description: '펜타클의 2는 균형과 적응, 유연한 대처를 상징합니다.',
    },
    reversed: {
      keywords: ['불균형', '과도한 부담', '혼란'],
      description: '역방향의 펜타클의 2는 불균형과 과도한 부담을 경고합니다.',
    },
  },
  {
    id: 38,
    name: {
      en: 'Three of Pentacles',
      ko: '펜타클의 3',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 3,
    imageDescription: {
      scene: '석공이 수도원에서 두 명의 수도사와 함께 건축 계획을 논의하고 있습니다.',
      elements: [
        '작업 중인 석공',
        '설계도를 보는 두 수도사',
        '석조 아치와 벤치',
        '완성된 세 개의 펜타클',
        '고딕 양식의 건축물'
      ],
      symbolism: [
        '협력하는 모습: 팀워크',
        '설계도: 계획과 전문성',
        '건축물: 공동의 성과',
        '세 개의 펜타클: 기술, 지식, 계획의 조화'
      ]
    },
    upright: {
      keywords: ['협력', '숙련', '성과'],
      description: '펜타클의 3은 협력과 숙련된 기술, 가시적인 성과를 상징합니다.',
    },
    reversed: {
      keywords: ['미숙', '협력 부족', '품질 저하'],
      description: '역방향의 펜타클의 3은 미숙함과 협력 부족을 경고합니다.',
    },
  },
  {
    id: 39,
    name: {
      en: 'Four of Pentacles',
      ko: '펜타클의 4',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 4,
    imageDescription: {
      scene: '왕관을 쓴 인물이 펜타클을 꽉 붙잡고 앉아있습니다.',
      elements: [
        '한 펜타클을 머리에 얹은 인물',
        '가슴에 안은 펜타클',
        '발 아래 놓인 두 개의 펜타클',
        '도시의 전경',
        '왕좌같은 의자'
      ],
      symbolism: [
        '꽉 쥔 자세: 소유욕과 통제',
        '왕관 같은 펜타클: 물질적 성공',
        '발 아래 펜타클: 안정된 기반',
        '도시 배경: 물질적 세계'
      ]
    },
    upright: {
      keywords: ['소유', '안정', '보수'],
      description: '펜타클의 4는 소유와 안정, 보수적인 태도를 상징합니다.',
    },
    reversed: {
      keywords: ['집착', '물질주의', '변화 거부'],
      description: '역방향의 펜타클의 4는 물질에 대한 집착과 변화 거부를 경고합니다.',
    },
  },
  {
    id: 40,
    name: {
      en: 'Five of Pentacles',
      ko: '펜타클의 5',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 5,
    imageDescription: {
      scene: '눈 내리는 밤, 두 명의 가난한 사람이 스테인드글라스 창문 아래를 지나갑니다.',
      elements: [
        '목발을 짚은 부상자',
        '누더기 옷을 입은 동행인',
        '펜타클이 그려진 스테인드글라스 창',
        '눈 내리는 겨울 밤',
        '교회의 밝은 창문'
      ],
      symbolism: [
        '눈과 추위: 고난의 시기',
        '교회 창문: 간과된 도움',
        '함께 걷는 모습: 고난 속 연대',
        '스테인드글라스: 영적 안내'
      ]
    },
    upright: {
      keywords: ['고난', '빈곤', '소외'],
      description: '펜타클의 5는 물질적 어려움과 고난의 시기를 상징합니다.',
    },
    reversed: {
      keywords: ['회복', '개선', '도움'],
      description: '역방향의 펜타클의 5는 어려움에서 벗어나 회복되는 것을 나타냅니다.',
    },
  },
  {
    id: 41,
    name: {
      en: 'Six of Pentacles',
      ko: '펜타클의 6',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 6,
    imageDescription: {
      scene: '부유한 상인이 가난한 사람들에게 동전을 나눠주며 저울을 들고 있습니다.',
      elements: [
        '저울을 든 부유한 상인',
        '무릎 꿇은 두 명의 거지',
        '상인이 나누어주는 금화',
        '상인의 화려한 붉은 옷',
        '도시의 배경'
      ],
      symbolism: [
        '저울: 공정한 분배',
        '금화를 주는 행위: 관대함',
        '무릎 꿇은 자세: 겸손과 감사',
        '부유한 의상: 물질적 풍요'
      ]
    },
    upright: {
      keywords: ['관대함', '나눔', '지원'],
      description: '펜타클의 6은 관대함과 나눔, 지원을 상징합니다.',
    },
    reversed: {
      keywords: ['이기심', '불평등', '부족'],
      description: '역방향의 펜타클의 6은 이기심과 불평등을 경고합니다.',
    },
  },
  {
    id: 42,
    name: {
      en: 'Seven of Pentacles',
      ko: '펜타클의 7',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 7,
    imageDescription: {
      scene: '젊은 농부가 자신이 가꾼 펜타클 덩굴을 바라보며 휴식을 취하고 있습니다.',
      elements: [
        '호미에 기대어 서 있는 농부',
        '일곱 개의 펜타클이 달린 덩굴',
        '비옥한 정원',
        '농부의 작업복',
        '구름 낀 하늘'
      ],
      symbolism: [
        '성장하는 덩굴: 투자와 성장',
        '휴식하는 자세: 평가와 기다림',
        '농부의 모습: 성실한 노력',
        '일곱 펜타클: 진행 중인 성과'
      ]
    },
    upright: {
      keywords: ['인내', '성장', '기대'],
      description: '펜타클의 7은 인내와 성장을 통해 기대하는 것을 상징합니다.',
    },
    reversed: {
      keywords: ['좌절', '결실 없음', '낭비'],
      description: '역방향의 펜타클의 7은 좌절과 결실 없음, 낭비를 경고합니다.',
    },
  },
  {
    id: 43,
    name: {
      en: 'Eight of Pentacles',
      ko: '펜타클의 8',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 8,
    imageDescription: {
      scene: '장인이 집중하여 펜타클을 하나씩 정교하게 만들어내고 있습니다.',
      elements: [
        '작업대에서 일하는 장인',
        '완성된 일곱 개의 펜타클',
        '작업 중인 여덟 번째 펜타클',
        '도구가 있는 작업대',
        '멀리 보이는 도시'
      ],
      symbolism: [
        '집중하는 장인: 전문성과 헌신',
        '정교한 작업: 기술의 완성',
        '반복되는 작업: 꾸준한 노력',
        '도시 배경: 실용적 성과'
      ]
    },
    upright: {
      keywords: ['노력', '숙련', '헌신'],
      description: '펜타클의 8은 노력과 숙련, 헌신을 통해 성취를 상징합니다.',
    },
    reversed: {
      keywords: ['태만', '불성실', '기술 부족'],
      description: '역방향의 펜타클의 8은 태만과 불성실, 기술 부족을 경고합니다.',
    },
  },
  {
    id: 44,
    name: {
      en: 'Nine of Pentacles',
      ko: '펜타클의 9',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 9,
    imageDescription: {
      scene: '우아한 여인이 풍요로운 정원에서 매를 데리고 산책하고 있습니다.',
      elements: [
        '화려한 드레스를 입은 여인',
        '손에 앉은 매',
        '아홉 개의 황금 펜타클',
        '장미가 만발한 정원',
        '저택의 일부'
      ],
      symbolism: [
        '우아한 여인: 독립과 세련됨',
        '매: 훈련된 본성',
        '풍요로운 정원: 물질적 성공',
        '홀로 있는 모습: 자족'
      ]
    },
    upright: {
      keywords: ['독립', '성공', '물질적 풍요'],
      description: '펜타클의 9는 독립과 성공, 물질적 풍요를 상징합니다.',
    },
    reversed: {
      keywords: ['자신감 부족', '불안', '부족'],
      description: '역방향의 펜타클의 9는 자신감 부족과 불안을 경고합니다.',
    },
  },
  {
    id: 45,
    name: {
      en: 'Ten of Pentacles',
      ko: '펜타클의 10',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 10,
    imageDescription: {
      scene: '세대가 모인 가족이 성의 안뜰에서 함께 시간을 보내고 있습니다.',
      elements: [
        '노인과 젊은 부부, 아이들',
        '두 마리의 하얀 개',
        '열 개의 펜타클이 있는 문장',
        '화려한 성의 아치길',
        '가족의 문장이 있는 깃발'
      ],
      symbolism: [
        '세 세대: 유산과 전통',
        '성: 안정된 기반',
        '가문의 문장: 명예와 전통',
        '하얀 개: 충성과 보호'
      ]
    },
    upright: {
      keywords: ['유산', '안정', '가족 번영'],
      description: '펜타클의 10은 유산과 안정, 가족 번영을 상징합니다.',
    },
    reversed: {
      keywords: ['재정적 문제', '불안정', '가족 갈등'],
      description: '역방향의 펜타클의 10은 재정적 문제와 가족 갈등을 경고합니다.',
    },
  },
  {
    id: 46,
    name: {
      en: 'Page of Pentacles',
      ko: '펜타클의 페이지',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 11,
    imageDescription: {
      scene: '젊은 페이지가 펜타클을 집중해서 바라보며 들고 있습니다.',
      elements: [
        '녹색 숲 속의 평원',
        '펜타클을 바라보는 젊은이',
        '갈색과 녹색의 의상',
        '비옥한 대지',
        '멀리 보이는 산맥'
      ],
      symbolism: [
        '집중하는 시선: 학습과 호기심',
        '비옥한 대지: 성장의 가능성',
        '젊은이의 자세: 신중한 탐구',
        '산맥: 도달해야 할 목표'
      ]
    },
    upright: {
      keywords: ['학습', '기회', '잠재력'],
      description: '펜타클의 페이지는 학습과 기회, 잠재력을 상징합니다.',
    },
    reversed: {
      keywords: ['게으름', '집중력 부족', '잠재력 발휘 실패'],
      description: '역방향의 펜타클의 페이지는 게으름과 집중력 부족을 경고합니다.',
    },
  },
  {
    id: 47,
    name: {
      en: 'Knight of Pentacles',
      ko: '펜타클의 기사',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 12,
    imageDescription: {
      scene: '검은 말을 탄 기사가 펜타클을 신중하게 들고 서있습니다.',
      elements: [
        '무거운 갑옷을 입은 기사',
        '움직이지 않는 검은 말',
        '손에 든 황금 펜타클',
        '갈아엎은 밭',
        '멀리 보이는 산과 들판'
      ],
      symbolism: [
        '정지된 말: 신중함과 인내',
        '무거운 갑옷: 책임감',
        '갈아엎은 밭: 꾸준한 노력',
        '펜타클을 드는 자세: 실용적 접근'
      ]
    },
    upright: {
      keywords: ['헌신', '꾸준함', '책임감'],
      description: '펜타클의 기사는 헌신과 꾸준함, 책임감을 상징합니다.',
    },
    reversed: {
      keywords: ['지루함', '게으름', '비효율'],
      description: '역방향의 펜타클의 기사는 게으름과 비효율을 경고합니다.',
    },
  },
  {
    id: 48,
    name: {
      en: 'Queen of Pentacles',
      ko: '펜타클의 여왕',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 13,
    imageDescription: {
      scene: '풍요로운 정원에서 여왕이 펜타클을 품에 안고 앉아있습니다.',
      elements: [
        '화려한 왕좌에 앉은 여왕',
        '무릎 위의 황금 펜타클',
        '장미가 피어있는 정원',
        '토끼들이 뛰노는 모습',
        '푸른 나무와 덩굴'
      ],
      symbolism: [
        '정원: 풍요와 번영',
        '토끼: 다산과 풍요',
        '펜타클을 안은 자세: 물질적 보호',
        '장미: 사랑과 아름다움'
      ]
    },
    upright: {
      keywords: ['실용성', '풍요', '돌봄'],
      description: '펜타클의 여왕은 실용성과 물질적 풍요, 돌봄을 상징합니다.',
    },
    reversed: {
      keywords: ['물질적 집착', '관리 실패', '불안'],
      description: '역방향의 펜타클의 여왕은 물질적 집착과 관리 실패를 경고합니다.',
    },
  },
  {
    id: 49,
    name: {
      en: 'King of Pentacles',
      ko: '펜타클의 왕',
    },
    arcanaType: 'Minor',
    suit: 'Pentacle',
    number: 14,
    imageDescription: {
      scene: '화려한 왕좌에서 펜타클을 들고 있는 부유한 왕의 모습입니다.',
      elements: [
        '포도덩굴로 장식된 왕좌',
        '손에 든 황금 펜타클',
        '화려한 왕관과 망토',
        '성공을 상징하는 황소 문양',
        '풍요로운 성의 정원'
      ],
      symbolism: [
        '왕좌의 장식: 물질적 성공',
        '황소 문양: 안정과 부',
        '정원: 번영의 결실',
        '왕의 자세: 성공적인 통치'
      ]
    },
    upright: {
      keywords: ['성공', '안정', '풍요'],
      description: '펜타클의 왕은 성공과 안정, 물질적 풍요를 상징합니다.',
    },
    reversed: {
      keywords: ['물질주의', '독단', '과시'],
      description: '역방향의 펜타클의 왕은 물질주의와 독단, 과시를 경고합니다.',
    },
  },
  {
    id: 50,
    name: {
      en: 'Ace of Swords',
      ko: '검의 에이스',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 1,
    imageDescription: {
      scene: '구름 사이로 나온 손이 왕관이 씌워진 검을 들고 있습니다.',
      elements: [
        '구름 속의 손이 든 검',
        '검 위의 황금 왕관',
        '월계수와 종려나무 가지',
        '산봉우리가 보이는 배경',
        '회색 구름'
      ],
      symbolism: [
        '검: 진실과 정의',
        '왕관: 승리와 성공',
        '월계수: 승리와 영광',
        '구름: 정신적 영역'
      ]
    },
    upright: {
      keywords: ['명확성', '결단력', '진실'],
      description: '검의 에이스는 명확성과 결단력, 진실을 상징합니다.',
    },
    reversed: {
      keywords: ['혼란', '결단력 부족', '거짓'],
      description: '역방향의 검의 에이스는 혼란과 결단력 부족을 경고합니다.',
    },
  },
  {
    id: 51,
    name: {
      en: 'Two of Swords',
      ko: '검의 2',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 2,
    imageDescription: {
      scene: '눈가리개를 한 여인이 균형잡힌 자세로 두 검을 들고 있습니다.',
      elements: [
        '눈가리개를 한 여인',
        '교차된 두 개의 검',
        '바다와 초승달',
        '돌로 된 벤치',
        '구름 낀 밤하늘'
      ],
      symbolism: [
        '눈가리개: 객관성과 중립',
        '교차된 검: 어려운 선택',
        '바다: 감정의 깊이',
        '초승달: 직관과 통찰'
      ]
    },
    upright: {
      keywords: ['결정', '균형', '선택'],
      description: '검의 2는 결정을 내리는 균형과 선택을 상징합니다.',
    },
    reversed: {
      keywords: ['결정 회피', '갈등', '혼란'],
      description: '역방향의 검의 2는 결정을 회피하고 갈등을 나타냅니다.',
    },
  },
  {
    id: 52,
    name: {
      en: 'Three of Swords',
      ko: '검의 3',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 3,
    imageDescription: {
      scene: '비가 내리는 하늘 속에서 세 개의 검이 하나의 심장을 관통하고 있습니다.',
      elements: [
        '빨간 심장을 관통하는 세 검',
        '폭풍우 치는 하늘',
        '회색 구름',
        '내리는 비',
        '기하학적 배열의 검'
      ],
      symbolism: [
        '관통된 심장: 감정적 상처',
        '세 개의 검: 고통의 깊이',
        '비: 슬픔과 정화',
        '구름: 어두운 시기'
      ]
    },
    upright: {
      keywords: ['슬픔', '상처', '이별'],
      description: '검의 3은 슬픔과 상처, 이별을 상징합니다.',
    },
    reversed: {
      keywords: ['치유', '용서', '회복'],
      description: '역방향의 검의 3은 치유와 용서, 회복을 나타냅니다.',
    },
  },
  {
    id: 53,
    name: {
      en: 'Four of Swords',
      ko: '검의 4',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 4,
    imageDescription: {
      scene: '교회의 석관 위에 기사가 누워 있고, 벽에는 스테인드글라스가 있습니다.',
      elements: [
        '석관 위에 누운 기사',
        '기도하는 자세의 조각상',
        '벽에 걸린 한 자루의 검',
        '스테인드글라스 창문',
        '석조 건축물'
      ],
      symbolism: [
        '누운 기사: 휴식과 명상',
        '기도하는 자세: 영적 성찰',
        '석관: 일시적 은둔',
        '스테인드글라스: 영적 깨달음'
      ]
    },
    upright: {
      keywords: ['휴식', '명상', '회복'],
      description: '검의 4는 휴식과 명상, 회복을 상징합니다.',
    },
    reversed: {
      keywords: ['불안', '스트레스', '재충전 필요'],
      description: '역방향의 검의 4는 불안과 스트레스, 재충전의 필요성을 경고합니다.',
    },
  },
  {
    id: 54,
    name: {
      en: 'Five of Swords',
      ko: '검의 5',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 5,
    imageDescription: {
      scene: '승리한 한 사람이 검들을 모으고 있고, 패배한 두 사람이 떠나고 있습니다.',
      elements: [
        '검을 줍는 승리자',
        '떠나가는 패배자들',
        '흐린 하늘',
        '거친 바다',
        '땅에 떨어진 검들'
      ],
      symbolism: [
        '승리자의 자세: 교만한 승리',
        '떠나는 패배자: 굴욕과 상실',
        '거친 바다: 갈등의 여파',
        '흐린 하늘: 불안정한 상황'
      ]
    },
    upright: {
      keywords: ['갈등', '패배', '자존심 상실'],
      description: '검의 5는 갈등과 패배, 자존심 상실을 상징합니다.',
    },
    reversed: {
      keywords: ['화해', '평화', '갈등 해결'],
      description: '역방향의 검의 5는 화해와 갈등 해결을 나타냅니다.',
    },
  },
  {
    id: 55,
    name: {
      en: 'Six of Swords',
      ko: '검의 6',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 6,
    imageDescription: {
      scene: '뱃사공이 한 여인과 아이를 조용한 물가로 데려가고 있습니다.',
      elements: [
        '배를 젓는 뱃사공',
        '망토를 쓴 여인과 아이',
        '배에 꽂힌 여섯 개의 검',
        '잔잔한 물',
        '멀리 보이는 육지'
      ],
      symbolism: [
        '여행: 전환과 이동',
        '잔잔한 물: 평화로운 이행',
        '꽂힌 검: 과거의 어려움',
        '멀리 보이는 육지: 새로운 시작'
      ]
    },
    upright: {
      keywords: ['전환', '이동', '회복'],
      description: '검의 6은 전환과 이동, 회복을 상징합니다.',
    },
    reversed: {
      keywords: ['정체', '변화의 저항', '좌절'],
      description: '역방향의 검의 6은 정체와 변화에 대한 저항을 경고합니다.',
    },
  },
  {
    id: 56,
    name: {
      en: 'Seven of Swords',
      ko: '검의 7',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 7,
    imageDescription: {
      scene: '한 남자가 다섯 개의 검을 몰래 가져가고 있고, 두 개의 검을 남겨두고 있습니다.',
      elements: [
        '검을 훔치는 남자',
        '진영의 텐트들',
        '다섯 개의 훔친 검',
        '남겨진 두 개의 검',
        '멀리 보이는 경비병들'
      ],
      symbolism: [
        '몰래 가져가는 행동: 책략과 기만',
        '남겨진 검: 미완성된 계획',
        '텐트: 안전지대를 벗어남',
        '경비병: 발각될 위험'
      ]
    },
    upright: {
      keywords: ['속임수', '전략', '독립성'],
      description: '검의 7은 속임수와 전략, 독립성을 상징합니다.',
    },
    reversed: {
      keywords: ['폭로', '후회', '실패'],
      description: '역방향의 검의 7은 속임수가 폭로되거나 후회를 경고합니다.',
    },
  },
  {
    id: 57,
    name: {
      en: 'Eight of Swords',
      ko: '검의 8',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 8,
    imageDescription: {
      scene: '눈가리개를 하고 묶인 여인이 여덟 개의 검에 둘러싸여 있습니다.',
      elements: [
        '눈가리개와 묶인 여인',
        '원을 이루는 여덟 개의 검',
        '습지대의 진흙',
        '멀리 보이는 성',
        '회색 하늘'
      ],
      symbolism: [
        '눈가리개: 상황 파악 불가',
        '묶인 상태: 자기 제한',
        '검의 원: 장애물과 제약',
        '멀리 보이는 성: 도달하기 어려운 목표'
      ]
    },
    upright: {
      keywords: ['제약', '제한', '무력감'],
      description: '검의 8은 제약과 제한, 무력감을 상징합니다.',
    },
    reversed: {
      keywords: ['자유', '해방', '제한에서 벗어남'],
      description: '역방향의 검의 8은 제약에서 벗어나 자유를 찾는 것을 나타냅니다.',
    },
  },
  {
    id: 58,
    name: {
      en: 'Nine of Swords',
      ko: '검의 9',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 9,
    imageDescription: {
      scene: '한밤중에 침대에서 깨어난 사람이 얼굴을 손으로 가린 채 괴로워하고 있습니다.',
      elements: [
        '침대에 앉아 괴로워하는 인물',
        '벽에 걸린 아홉 개의 검',
        '장미가 새겨진 이불',
        '어두운 밤',
        '조각된 침대 프레임'
      ],
      symbolism: [
        '밤: 불안과 두려움의 시간',
        '벽의 검: 걱정과 근심',
        '장미 무늬: 감정적 고통',
        '손으로 가린 얼굴: 절망'
      ]
    },
    upright: {
      keywords: ['불안', '두려움', '고민'],
      description: '검의 9는 불안과 두려움, 고민을 상징합니다.',
    },
    reversed: {
      keywords: ['불안 해소', '희망의 회복', '치유'],
      description: '역방향의 검의 9는 불안이 해소되고 희망이 회복되는 것을 상징합니다.',
    },
  },
  {
    id: 59,
    name: {
      en: 'Ten of Swords',
      ko: '검의 10',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 10,
    imageDescription: {
      scene: '열 개의 검이 쓰러진 인물의 등을 관통하고 있고, 지평선에는 새벽이 밝아오고 있습니다.',
      elements: [
        '쓰러진 인물',
        '등을 관통한 열 개의 검',
        '검은 하늘',
        '떠오르는 태양',
        '고요한 바다'
      ],
      symbolism: [
        '관통된 등: 완전한 패배',
        '떠오르는 태양: 새로운 시작의 희망',
        '검은 하늘: 끝의 순간',
        '고요한 바다: 평화로운 수용'
      ]
    },
    upright: {
      keywords: ['파멸', '끝', '고통'],
      description: '검의 10은 완전한 파멸과 끝, 극심한 고통을 상징합니다.',
    },
    reversed: {
      keywords: ['회복', '재생', '새로운 시작'],
      description: '역방향의 검의 10은 고통에서의 회복과 새로운 시작을 나타냅니다.',
    },
  },
  {
    id: 60,
    name: {
      en: 'Page of Swords',
      ko: '검의 페이지',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 11,
    imageDescription: {
      scene: '젊은 페이지가 높은 곳에 서서 검을 들고 하늘을 바라보고 있습니다.',
      elements: [
        '검을 든 젊은 페이지',
        '바람에 날리는 구름',
        '나무가 휘어질 정도의 강한 바람',
        '황량한 언덕',
        '새들이 날아다니는 하늘'
      ],
      symbolism: [
        '바람: 사고와 아이디어의 흐름',
        '높은 위치: 넓은 시야',
        '검을 드는 자세: 진실 추구',
        '날아다니는 새: 자유로운 생각'
      ]
    },
    upright: {
      keywords: ['호기심', '통찰', '예리함'],
      description: '검의 페이지는 호기심과 통찰, 예리한 지성을 상징합니다.',
    },
    reversed: {
      keywords: ['경솔함', '산만함', '미숙'],
      description: '역방향의 검의 페이지는 경솔함과 산만함을 경고합니다.',
    },
  },
  {
    id: 61,
    name: {
      en: 'Knight of Swords',
      ko: '검의 기사',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 12,
    imageDescription: {
      scene: '기사가 하얀 말을 타고 검을 들며 폭풍우 속을 질주하고 있습니다.',
      elements: [
        '질주하는 하얀 말',
        '검을 든 기사',
        '거센 바람에 휘날리는 망토',
        '폭풍우 치는 하늘',
        '험난한 지형'
      ],
      symbolism: [
        '질주하는 말: 빠른 행동과 결정',
        '휘날리는 망토: 급박한 상황',
        '들어올린 검: 공격적인 접근',
        '폭풍우: 혼돈과 도전'
      ]
    },
    upright: {
      keywords: ['결단력', '행동력', '신속'],
      description: '검의 기사는 결단력과 행동력, 신속한 결정을 상징합니다.',
    },
    reversed: {
      keywords: ['충동', '무모함', '실패'],
      description: '역방향의 검의 기사는 충동적이고 무모한 결정을 경고합니다.',
    },
  },
  {
    id: 62,
    name: {
      en: 'Queen of Swords',
      ko: '검의 여왕',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 13,
    imageDescription: {
      scene: '구름 위 왕좌에 앉아 검을 들고 있는 여왕의 모습입니다.',
      elements: [
        '구름 위의 석조 왕좌',
        '한 손에 든 검',
        '다른 손을 뻗은 자세',
        '날카로운 시선',
        '구름이 떠다니는 하늘'
      ],
      symbolism: [
        '높은 왕좌: 객관적 시각',
        '들어올린 검: 명확한 판단',
        '뻗은 손: 공정함',
        '구름: 지적 영역'
      ]
    },
    upright: {
      keywords: ['지혜', '객관성', '명료함'],
      description: '검의 여왕은 지혜와 객관성, 명료한 판단을 상징합니다.',
    },
    reversed: {
      keywords: ['냉정함', '고립', '과도한 비판'],
      description: '역방향의 검의 여왕은 냉정함과 과도한 비판을 경고합니다.',
    },
  },
  {
    id: 63,
    name: {
      en: 'King of Swords',
      ko: '검의 왕',
    },
    arcanaType: 'Minor',
    suit: 'Sword',
    number: 14,
    imageDescription: {
      scene: '구름 위 왕좌에서 검을 들고 앞을 응시하는 왕의 모습입니다.',
      elements: [
        '높은 왕좌에 앉은 왕',
        '오른손에 든 검',
        '나비 장식의 왕관',
        '푸른 하늘과 구름',
        '장식된 왕좌'
      ],
      symbolism: [
        '위엄있는 자세: 권위와 지성',
        '들어올린 검: 정의와 진실',
        '나비 장식: 변화와 지혜',
        '구름 위 왕좌: 이성적 판단'
      ]
    },
    upright: {
      keywords: ['리더십', '논리', '진실'],
      description: '검의 왕은 리더십과 논리, 진실을 상징합니다.',
    },
    reversed: {
      keywords: ['독재', '비합리성', '불공정'],
      description: '역방향의 검의 왕은 독재적 성향과 불공정을 경고합니다.',
    },
  },
  {
    id: 64,
    name: {
      en: 'Ace of Wands',
      ko: '완드의 에이스',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 1,
    imageDescription: {
      scene: '구름 사이로 나온 손이 싹이 돋은 나뭇가지를 들고 있습니다.',
      elements: [
        '구름 속의 신성한 손',
        '싹이 돋은 나무 지팡이',
        '푸른 잎과 꽃봉오리',
        '성이 보이는 풍경',
        '빛나는 하늘'
      ],
      symbolism: [
        '싹: 새로운 시작과 성장',
        '나무 지팡이: 창조적 힘',
        '성: 성취할 목표',
        '빛나는 하늘: 영감과 가능성'
      ]
    },
    upright: {
      keywords: ['창조력', '열정', '새로운 시작'],
      description: '완드의 에이스는 창조력과 열정, 새로운 시작을 상징합니다.',
    },
    reversed: {
      keywords: ['방해', '지연', '동기 부족'],
      description: '완드의 에이스 역방향은 방해와 동기 부족을 경고합니다.',
    },
  },
  {
    id: 65,
    name: {
      en: 'Two of Wands',
      ko: '완드의 2',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 2,
    imageDescription: {
      scene: '성벽 위에서 한 남자가 지구본을 들고 멀리를 바라보고 있습니다.',
      elements: [
        '성벽에 선 남자',
        '손에 든 지구본',
        '벽에 걸린 두 개의 완드',
        '멀리 보이는 바다와 산',
        '붉은 옷을 입은 인물'
      ],
      symbolism: [
        '지구본: 세계를 향한 야망',
        '높은 시점: 넓은 시야',
        '두 완드: 선택과 가능성',
        '바다와 산: 도전과 모험'
      ]
    },
    upright: {
      keywords: ['계획', '결정', '미래지향'],
      description: '완드의 2는 계획과 결정, 미래를 향한 준비를 상징합니다.',
    },
    reversed: {
      keywords: ['불확실성', '결정 회피', '장애'],
      description: '완드의 2 역방향은 불확실성과 결정 회피를 경고합니다.',
    },
  },
  {
    id: 66,
    name: {
      en: 'Three of Wands',
      ko: '완드의 3',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 3,
    imageDescription: {
      scene: '한 상인이 산 위에 서서 바다를 건너오는 배들을 바라보고 있습니다.',
      elements: [
        '산 위에 선 상인',
        '세 개의 완드',
        '항해하는 배들',
        '넓은 바다',
        '일출의 하늘'
      ],
      symbolism: [
        '높은 위치: 넓은 시야와 전망',
        '배: 도착하는 기회',
        '세 완드: 확장과 성장',
        '일출: 새로운 가능성'
      ]
    },
    upright: {
      keywords: ['확장', '성장', '기회'],
      description: '완드의 3은 확장과 성장, 기회를 상징합니다.',
    },
    reversed: {
      keywords: ['실패', '지연', '좌절'],
      description: '완드의 3 역방향은 실패와 좌절을 경고합니다.',
    },
  },
  {
    id: 67,
    name: {
      en: 'Four of Wands',
      ko: '완드의 4',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 4,
    imageDescription: {
      scene: '꽃으로 장식된 네 개의 완드 아래에서 사람들이 축하하고 있습니다.',
      elements: [
        '꽃으로 장식된 네 개의 완드',
        '춤추는 사람들',
        '성이 있는 배경',
        '축제의 분위기',
        '화창한 하늘'
      ],
      symbolism: [
        '꽃 장식: 축하와 기쁨',
        '네 완드의 구조물: 안정된 기반',
        '춤추는 사람들: 조화와 성취',
        '성: 견고한 기반'
      ]
    },
    upright: {
      keywords: ['축하', '성취', '안정'],
      description: '완드의 4는 축하와 성취, 안정된 상태를 상징합니다.',
    },
    reversed: {
      keywords: ['불안정', '불만족', '조화 부족'],
      description: '완드의 4 역방향은 불안정과 조화 부족을 경고합니다.',
    },
  },
  {
    id: 68,
    name: {
      en: 'Five of Wands',
      ko: '완드의 5',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 5,
    imageDescription: {
      scene: '다섯 명의 젊은이가 완드를 들고 서로 경쟁하듯 싸우고 있습니다.',
      elements: [
        '다섯 명의 젊은이',
        '서로 부딪히는 완드들',
        '혼란스러운 장면',
        '다양한 의상',
        '맑은 하늘'
      ],
      symbolism: [
        '부딪히는 완드: 경쟁과 갈등',
        '다양한 의상: 다른 관점들',
        '혼란스러운 구도: 무질서',
        '젊은이들: 활기찬 에너지'
      ]
    },
    upright: {
      keywords: ['갈등', '경쟁', '도전'],
      description: '완드의 5는 갈등과 경쟁, 도전을 상징합니다.',
    },
    reversed: {
      keywords: ['갈등 해결', '협력', '화합'],
      description: '완드의 5 역방향은 갈등 해결과 협력을 나타냅니다.',
    },
  },
  {
    id: 69,
    name: {
      en: 'Six of Wands',
      ko: '완드의 6',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 6,
    imageDescription: {
      scene: '월계관을 쓴 기사가 흰 말을 타고 승리의 행진을 하고 있습니다.',
      elements: [
        '월계관 쓴 기사',
        '하얀 말',
        '축하하는 군중',
        '들어올린 완드들',
        '화려한 장식'
      ],
      symbolism: [
        '월계관: 승리와 영예',
        '하얀 말: 순수한 성공',
        '축하하는 군중: 인정과 찬사',
        '들어올린 완드: 성취의 표시'
      ]
    },
    upright: {
      keywords: ['승리', '인정', '성공'],
      description: '완드의 6은 승리와 인정, 성공을 상징합니다.',
    },
    reversed: {
      keywords: ['실패', '비판', '인정 부족'],
      description: '완드의 6 역방향은 실패와 비판을 경고합니다.',
    },
  },
  {
    id: 70,
    name: {
      en: 'Seven of Wands',
      ko: '완드의 7',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 7,
    imageDescription: {
      scene: '한 남자가 높은 곳에서 아래에서 올라오는 여섯 개의 완드에 맞서 싸우고 있습니다.',
      elements: [
        '높은 곳에 선 남자',
        '방어적 자세',
        '아래에서 올라오는 여섯 완드',
        '험난한 지형',
        '서로 다른 신발'
      ],
      symbolism: [
        '높은 위치: 유리한 입장',
        '방어 자세: 도전에 맞섬',
        '여섯 완드: 다수의 도전',
        '서로 다른 신발: 준비 부족'
      ]
    },
    upright: {
      keywords: ['도전', '방어', '경쟁'],
      description: '완드의 7은 도전과 방어, 경쟁을 상징합니다.',
    },
    reversed: {
      keywords: ['좌절', '포기', '약함'],
      description: '완드의 7 역방향은 좌절과 포기를 경고합니다.',
    },
  },
  {
    id: 71,
    name: {
      en: 'Eight of Wands',
      ko: '완드의 8',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 8,
    imageDescription: {
      scene: '여덟 개의 완드가 하늘을 가로질러 빠르게 날아가고 있습니다.',
      elements: [
        '날아가는 여덟 개의 완드',
        '푸른 하늘',
        '초원이 있는 풍경',
        '멀리 보이는 언덕',
        '역동적인 구도'
      ],
      symbolism: [
        '날아가는 완드: 빠른 진행',
        '평행한 배열: 명확한 방향',
        '열린 하늘: 가능성',
        '초원: 성장의 기회'
      ]
    },
    upright: {
      keywords: ['속도', '진행', '변화'],
      description: '완드의 8은 속도감 있는 진행과 변화를 상징합니다.',
    },
    reversed: {
      keywords: ['지연', '방해', '혼란'],
      description: '완드의 8 역방향은 지연과 방해를 경고합니다.',
    },
  },
  {
    id: 72,
    name: {
      en: 'Nine of Wands',
      ko: '완드의 9',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 9,
    imageDescription: {
      scene: '부상당한 전사가 완드를 붙잡고 경계하며 서 있고, 뒤로 여덟 개의 완드가 보입니다.',
      elements: [
        '부상당한 전사',
        '손에 쥔 완드',
        '배경의 여덟 완드',
        '붕대 감은 머리',
        '경계하는 표정'
      ],
      symbolism: [
        '부상: 이전의 시련',
        '경계하는 자세: 방어와 준비',
        '아홉 개의 완드: 축적된 경험',
        '붕대: 회복력'
      ]
    },
    upright: {
      keywords: ['끈기', '인내', '방어'],
      description: '완드의 9는 끈기와 인내, 방어를 상징합니다.',
    },
    reversed: {
      keywords: ['포기', '좌절', '지침'],
      description: '완드의 9 역방향은 포기와 좌절, 지침을 경고합니다.',
    },
  },
  {
    id: 73,
    name: {
      en: 'Ten of Wands',
      ko: '완드의 10',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 10,
    imageDescription: {
      scene: '한 남자가 열 개의 무거운 완드를 힘겹게 들고 마을을 향해 걸어가고 있습니다.',
      elements: [
        '무거운 완드를 든 남자',
        '구부정한 자세',
        '멀리 보이는 마을',
        '내리막길',
        '무거운 짐'
      ],
      symbolism: [
        '무거운 완드: 과도한 책임',
        '구부정한 자세: 부담의 무게',
        '마을: 목표의 근접',
        '내리막길: 마지막 노력'
      ]
    },
    upright: {
      keywords: ['책임', '부담', '압박'],
      description: '완드의 10은 책임감과 부담을 상징합니다.',
    },
    reversed: {
      keywords: ['무거운 짐', '스트레스', '해방'],
      description: '완드의 10 역방향은 무거운 짐과 스트레스에서 해방됨을 나타냅니다.',
    },
  },
  {
    id: 74,
    name: {
      en: 'Page of Wands',
      ko: '완드의 견습생',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 11,
    imageDescription: {
      scene: '젊은 견습생이 활짝 핀 완드를 들고 호기심 어린 표정으로 바라보고 있습니다.',
      elements: [
        '화려한 의상의 견습생',
        '꽃이 핀 완드',
        '사막 같은 배경',
        '맑은 하늘',
        '호기심 가득한 표정'
      ],
      symbolism: [
        '꽃 핀 완드: 새로운 가능성',
        '화려한 의상: 열정과 에너지',
        '사막 배경: 미지의 영역',
        '호기심 어린 표정: 탐구 정신'
      ]
    },
    upright: {
      keywords: ['열정', '탐구', '모험'],
      description: '완드의 견습생은 열정과 탐구, 모험을 상징합니다.',
    },
    reversed: {
      keywords: ['혼란', '지연', '목표 상실'],
      description: '완드의 견습생 역방향은 혼란과 목표 상실을 경고합니다.',
    },
  },
  {
    id: 75,
    name: {
      en: 'Knight of Wands',
      ko: '완드의 기사',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 12,
    imageDescription: {
      scene: '기사가 불타는 완드를 들고 말을 타고 광야를 질주하고 있습니다.',
      elements: [
        '질주하는 붉은 말',
        '불타는 완드를 든 기사',
        '기사의 불꽃 장식 갑옷',
        '말의 불타는 갈기',
        '사막의 배경'
      ],
      symbolism: [
        '질주하는 말: 열정적 행동',
        '불타는 완드: 창조적 에너지',
        '불꽃 장식: 강렬한 의지',
        '사막: 모험의 영역'
      ]
    },
    upright: {
      keywords: ['열정', '행동력', '용기'],
      description: '완드의 기사는 열정과 행동력, 용기를 상징합니다.',
    },
    reversed: {
      keywords: ['무모함', '충동', '불안정'],
      description: '완드의 기사 역방향은 무모함과 충동적인 행동을 경고합니다.',
    },
  },
  {
    id: 76,
    name: {
      en: 'Queen of Wands',
      ko: '완드의 여왕',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 13,
    imageDescription: {
      scene: '여왕이 해바라기를 들고 검은 고양이와 함께 왕좌에 앉아 있습니다.',
      elements: [
        '왕좌에 앉은 여왕',
        '손에 든 완드',
        '해바라기',
        '검은 고양이',
        '사자 장식의 왕좌'
      ],
      symbolism: [
        '해바라기: 생명력과 자신감',
        '검은 고양이: 독립성과 직관',
        '사자 장식: 힘과 권위',
        '당당한 자세: 카리스마'
      ]
    },
    upright: {
      keywords: ['자신감', '독립', '카리스마'],
      description: '완드의 여왕은 자신감과 독립성, 카리스마를 상징합니다.',
    },
    reversed: {
      keywords: ['불안정', '자기중심적', '질투'],
      description: '완드의 여왕 역방향은 자기중심적 태도와 질투를 경고합니다.',
    },
  },
  {
    id: 77,
    name: {
      en: 'King of Wands',
      ko: '완드의 왕',
    },
    arcanaType: 'Minor',
    suit: 'Wand',
    number: 14,
    imageDescription: {
      scene: '왕이 불타는 완드를 들고 사자 장식이 있는 왕좌에 앉아 있습니다.',
      elements: [
        '왕좌에 앉은 왕',
        '불타는 완드',
        '도마뱀 장식',
        '사자 문양의 망토',
        '화려한 왕관'
      ],
      symbolism: [
        '불타는 완드: 창조적 힘',
        '도마뱀: 적응력과 재생',
        '사자 문양: 용기와 리더십',
        '당당한 자세: 권위와 비전'
      ]
    },
    upright: {
      keywords: ['리더십', '비전', '창의력'],
      description: '완드의 왕은 리더십과 비전, 창의력을 상징합니다.',
    },
    reversed: {
      keywords: ['오만', '독단', '불안정'],
      description: '완드의 왕 역방향은 오만과 독단을 경고합니다.',
    },
  }
];
