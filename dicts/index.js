const publicInterests = [
  'дискусії з питань, що хвилюють суспільство чи його частину, необхідності роз\'яснення питань, які важливі для актуальної суспільної дискусії',
  'з\'ясуванню та розумінню причин, які лежать в основі рішень, які приймає державний орган, орган місцевого самоврядування, його службова чи посадова особа',
  'посиленню підзвітності і підконтрольності влади суспільству загалом, у тому числі шляхом забезпечення прозорості процесу підготовки і прийняття владних рішень',
  'дієвому контролю за надходженням та витрачанням публічних коштів, розпорядженням державним або комунальним майном, розподіленням соціальних благ',
  'запобіганню розтраті, привласненню публічних коштів і майна, запобіганню незаконному особистому збагаченню публічних службовців',
  'захисту навколишнього середовища, виявленню завданої або можливої шкоди екології, обізнаності суспільства про дійсний стан довкілля та чинники, які на нього впливають',
  'виявленню ризиків для здоров\'я людей, для громадської безпеки і порядку, запобігання їм та їх наслідкам',
  'виявленню шкідливих для людини наслідків діяльності (бездіяльності) фізичних або юридичних осіб',
  'інформуванню про діяльність органів публічної влади (державних органів, органів місцевого самоврядування), про їхні внутрішні правила, організацію роботи тощо',
  'інформуванню про діяльність та поведінку публічних осіб, тобто осіб, які обіймають посади публічної служби та/або користуються публічними ресурсами, а також, у ширшому значенні, осіб, які відіграють певну роль у громадському житті - в політиці, економіці, мистецтві, соціальній сфері, спорті чи у будь-якій іншій сфері',
  'викриттю недоліків у діяльності органів публічної влади, їхніх працівників',
  'виявленню порушень прав людини, зловживання владою, корупційних правопорушень, неетичної поведінки публічних службовців, невиконання (чи неналежного, недбалого виконання) ними своїх обов\'язків, дискримінації за будь-якою ознакою',
  'інноваціям, науковим дослідженням',
  'економічному розвитку, підприємницькій діяльності, інвестиціям',
  'виявленню фактів введення громадськості в оману'
]

const claimTypes = [
  { title: 'Відмова в задоволенні запиту на інформацію' },
  { title: 'Відстрочка задоволення запиту на інформацію' },
  { title: 'Ненадання відповіді на запит на інформацію' },
  { title: 'Надання недостовірної або неповної інформації' },
  { title: 'Несвоєчасне надання інформації' },
  { title: 'Невиконання розпорядниками обов\'язку оприлюднювати інформацію відповідно до статті 15 Закону' },
  { title: 'Інші рішення, дії чи бездіяльність розпорядників інформації, що порушили законні права та інтереси запитувача' }
]

const rejectTypes = [
  { title: 'розпорядник не володіє інформацією', description: 'Розпорядник не володіє і не зобов\'язаний володіти запитуваною інформацією відповідно до компетенції, передбаченої законодавством' },
  { title: 'не сплачено відшкодування витрат на копіювання', description: 'мною не було сплачено відшкодування фактичних витрат на копіювання або друк' },
  { title: 'не дотримано вимог оформлення запиту', description: 'не дотримано вимог до запиту на інформацію, передбачених частиною п’ятою статті 19 Закону України «Про доступ до публічної інформації»' },
  { title: 'запит має ознаки звернення громадян', description: 'для задоволення запиту необхідно створити інформацію, відповідно порядок розгляду запиту регулюється Законом України «Про звернення громадян»' },
  { title: 'Запитувана інформація є обмеженою у доступі (конфіденційною, службовою чи таємною)', description: '' },
  { title: 'Запитувана інформація містить персональні дані', description: 'запитувана мною інформація містить персональні дані' },
  { title: 'Запитувана інформація не є створеною', description: 'запитувана мною інформація не є створеною' },
  { title: 'Розпорядник інформації не має обов\'язків надавати інфорамцію', description: 'юридична особа, до якої було направлено запит, не є розпорядником інформації' },
  { title: 'Інше', description: '' },
]

// Відповідач не є розпорядником інформації (не має обов’язків надавати інфорамцію)

module.exports = {
  claimTypes,
  rejectTypes
}
