module.exports = {
  printWidth: 100, // 指定每行代码的最佳长度， 如果超出长度则换行。
  useTabs: false, // 使用制表符（tab）缩进
  tabWidth: 2, // 每个缩进级别的空格数
  semi: false, // 是否在每行末尾添加分号
  singleQuote: true, // 如果为 true，将优先使用单引号而不是双引号
  quoteProps: 'as-needed', // 更改对象中属性的括号: "as-needed" - 如果需要，则为属性添加引号; "consistent" - 如果对象中有一个属性需要引号，则为所有属性添加引号; "preserve" - 不强求，尊重你的写法
  jsxSingleQuote: true, // 在 JSX 中使用单引号而不是双引号
  trailingComma: 'es5', // 尽可能控制尾随逗号的输出。 有效选项: "none" - 无尾随逗号; "es5" - 在 ES5 中有效的尾随逗号（对象，数组等）; "all" - 尽可能尾随逗号（包括函数参数）
  bracketSpacing: true, // 控制对象字面量的空格输出
  bracketSameLine: false, // 将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）。
  arrowParens: 'always', // 当箭头函数仅有一个参数时加上括号: "always" || "avoid"
  vueIndentScriptAndStyle: false, // 是否缩进 Vue 文件中 <script> 和 <style> 标记内的代码。 有些人（比如 Vue 的创建者）不通过缩进来保存缩进级别，但这可能会破坏编辑器中的代码折叠。
  requirePragma: false, // Prettier 可以将自己限制为仅格式化文件顶部包含特殊注释（称为 pragma）的文件。 这在将大型、未格式化的代码库逐渐转换为 prettier 时非常有用。
  insertPragma: false, // Prettier 可以在文件顶部插入一个特殊的 @format 标记，指定文件已使用 prettier 进行格式化。 与 requirePragma 选项一起使用时效果很好。 如果文件顶部已经有一个 docblock，则此选项将使用 @format 标记为其添加一个换行符。
  proseWrap: 'never', // （Markdown）将散文包含在多行中: "always" || "never" || "preserve"
  htmlWhitespaceSensitivity: 'strict', // 指定HTML文件的全局空白区域敏感度。 有效选项： "css" - 尊重 CSS 显示属性的默认值; "strict" - 空格被认为是敏感的; "ignore" - 空格被认为是不敏感的。
  embeddedLanguageFormatting: 'auto', // 控制是否将 Prettier 格式的带引号的代码嵌入到文件中: "auto" || "off"
  endOfLine: 'auto', // 指定 prettier 的换行符（各个操作系统表现不一致，建议使用 "auto"）
}
