import { DrawnTarotCard } from './card'

export type SpreadType =
  | 'SINGLE'
  | 'TRIPLE_CHOICE'
  | 'TRIPLE_TIMELINE'
  | 'FIVE_CARD_CROSS'
  | 'CELTIC_CROSS'

export interface SpreadOption {
  value: SpreadType
  label: string
  description: string
  cardCount: number
}

export const spreadOptions: SpreadOption[] = [
  {
    value: 'SINGLE',
    label: '싱글',
    cardCount: 1,
    description: '하나의 카드로 간단한 질문에 대한 답을 얻을 수 있는 기본적인 스프레드입니다.',
  },
  {
    value: 'TRIPLE_TIMELINE',
    label: '트리플-타임라인',
    cardCount: 3,
    description: '세 장의 카드로 시간의 흐름에 따른 상황을 살펴보는 스프레드',
  },
  {
    value: 'TRIPLE_CHOICE',
    label: '트리플-양자택일',
    cardCount: 3,
    description: '세 장의 카드로 선택의 기로에서 각 선택지의 결과를 살펴보는 스프레드',
  },
  {
    value: 'FIVE_CARD_CROSS',
    label: '파이브 카드 크로스',
    cardCount: 5,
    description: '다섯 장의 카드로 현재 상황을 입체적으로 분석하는 스프레드',
  },
  {
    value: 'CELTIC_CROSS',
    label: '켈틱 크로스',
    cardCount: 10,
    description: '10장의 카드로 질문자의 상황을 다각적으로 살펴보는 스프레드',
  },
]

export interface SpreadProps {
  cards: DrawnTarotCard[]
  revealed?: boolean
  onReveal?: () => void
  visibleCardCount?: number
}

export interface TripleSpreadProps extends SpreadProps {
  spreadType: 'TRIPLE_TIMELINE' | 'TRIPLE_CHOICE'
}

export interface SpreadInfo {
  type: SpreadType
  name: string
  description: string
  positions: string[] // 각 카드 포지션의 의미
}

export const SPREAD_INFO: { [key in SpreadType]: SpreadInfo } = {
  SINGLE: {
    type: 'SINGLE',
    name: '싱글 스프레드',
    description:
      '한 장의 카드로 질문에 대한 명확한 답을 얻는 스프레드입니다. 단순하지만 강력한 이 스프레드는 "예/아니오" 질문이나 현재 상황에 대한 즉각적인 통찰을 얻고자 할 때 특히 효과적입니다. 카드의 상징과 의미를 깊이 있게 해석하여 구체적인 지침을 제시합니다.',
    positions: ['첫 번째 카드 (현재 상황과 조언)'],
  },
  TRIPLE_CHOICE: {
    type: 'TRIPLE_CHOICE',
    name: '트리플 - 초이스',
    description:
      '선택의 갈림길에서 방향을 제시하는 3장 스프레드입니다. 중앙의 카드는 현재 상황을, 좌우의 카드는 각각 다른 선택지가 가져올 결과를 보여줍니다. 이를 통해 각 선택지의 장단점을 비교하고, 더 나은 결정을 내릴 수 있도록 도와줍니다.',
    positions: [
      '첫 번째 카드 (중앙 - 현재 상황)',
      '두 번째 카드 (왼쪽 - 첫 번째 선택)',
      '세 번째 카드 (오른쪽 - 두 번째 선택)',
    ],
  },
  TRIPLE_TIMELINE: {
    type: 'TRIPLE_TIMELINE',
    name: '트리플 - 타임라인',
    description:
      '시간의 흐름에 따른 통찰을 제공하는 3장 스프레드입니다. 과거의 영향력, 현재의 상황, 그리고 앞으로의 가능성을 살펴봄으로써 상황의 전체적인 흐름을 파악할 수 있습니다. 특히 현재의 고민이 과거로부터 어떻게 발전해왔고, 앞으로 어떻게 전개될 수 있는지를 이해하는 데 도움을 줍니다.',
    positions: [
      '첫 번째 카드 (왼쪽 - 과거의 영향)',
      '두 번째 카드 (중앙 - 현재의 상황)',
      '세 번째 카드 (오른쪽 - 미래의 가능성)',
    ],
  },
  FIVE_CARD_CROSS: {
    type: 'FIVE_CARD_CROSS',
    name: '파이브 카드 크로스',
    description:
      '십자가 모양으로 배열된 5장의 카드가 상황을 다각도로 분석하는 스프레드입니다. 이를 통해 상황을 보다 포괄적으로 이해하고 균형 잡힌 통찰을 얻을 수 있습니다.',
    positions: [
      '첫 번째 카드 (상단 - 잠재된 가능성)',
      '두 번째 카드 (좌측 - 과거의 영향)',
      '세 번째 카드 (중앙 - 현재 상황)',
      '네 번째 카드 (우측 - 다가올 영향)',
      '다섯 번째 카드 (하단 - 내면의 상태)',
    ],
  },
  CELTIC_CROSS: {
    type: 'CELTIC_CROSS',
    name: '켈틱 크로스',
    description:
      '가장 상세하고 심도 있는 해석을 제공하는 10장 스프레드입니다. 현재 상황을 중심으로, 영향을 주는 요소들, 희망과 두려움, 주변 환경, 조언, 그리고 최종 결과까지 모든 측면을 포괄적으로 살펴봅니다. 복잡한 상황이나 깊이 있는 통찰이 필요할 때 특히 유용하며, 각 카드의 위치가 가진 고유한 의미를 통해 상황을 입체적으로 이해할 수 있습니다.',
    positions: [
      '첫 번째 카드 (현재의 상황)',
      '두 번째 카드 (당면한 도전)',
      '세 번째 카드 (과거의 기반)',
      '네 번째 카드 (지나가는 영향)',
      '다섯 번째 카드 (희망하는 결과)',
      '여섯 번째 카드 (가까운 미래)',
      '일곱 번째 카드 (현재 자신의 태도)',
      '여덟 번째 카드 (주변 환경의 영향)',
      '아홉 번째 카드 (희망과 두려움)',
      '열 번째 카드 (최종 결과)',
    ],
  },
}
