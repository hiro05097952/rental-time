import Vue from 'vue';

Vue.filter('category', (value) => {
  switch (value) {
    case 'entrepreneurship':
      return '創業 / 副業';
    case 'marking':
      return '行銷';
    case 'chat':
      return '聊天';
    case 'music':
      return '音樂 / 樂器';
    case 'businessCommunication':
      return '職場溝通 / 諮詢';
    case 'cook':
      return '料理';
    case 'picture':
      return '攝影';
    case 'lifePlan':
      return '人生規劃';
    case 'divination':
      return '占卜';
    case 'love':
      return '戀愛諮詢';
    case 'diet':
      return '飲食調理 / 減肥';
    case 'makeup':
      return '化妝 / 保養';
    case 'family':
      return '家庭 / 教育';
    case 'sports':
      return '健身 / 運動';
    case 'animation':
      return '動畫製作';
    case 'other':
      return '其他';
    default:
      return '其他';
  }
});
