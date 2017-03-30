var postcss = require('postcss');
var gutil = require('gulp-util');
var _ = require('lodash');

var space = postcss.list.space;

module.exports = postcss.plugin('postcss-decls-ref', function (opts) {
	opts = opts || {};
	opts = _.merge({
		refMod: opts.refMod || 'clone', // `clone` or `group`
		dynamicAtRule: opts.dynamicAtRule || 'ref'
	}, opts);

	return function (root) {
		root.walkAtRules(opts.dynamicAtRule, function (atRule) {
			var params = space(atRule.params);
			var atRuleParent = atRule.parent;
			var selector = params[0];
			selector = _.trim(selector, '\'"()');

			var matchAtRule = false;
			// 获取到 @ref 所对应的 selector 对应的rule，可能有多个，包含有@media 的
			root.walkRules(new RegExp(selector), function (rule) {
				// Clone (克隆) 模式
				if (opts.refMod === 'clone') {
					// 如果是在 @media 里面的目标 selector
					if (rule.parent.type === 'atrule' && rule.parent.name === 'media') {
						var mediaAtrule = rule.parent;

						// 做一个拷贝
						var userInMedia = postcss.rule({
							selector: atRuleParent.selector,
							source: rule.source
						});

						// 再将新的 refer 的decls append 到 userInMedia 上
						_.forEach(rule.nodes, function (node) {
							var clone = node.clone();
							clone.raws.before = node.raws.before;
							clone.raws.after = node.raws.after;
							clone.raws.between = node.raws.between;
							userInMedia.append(clone);
						});

						// 再追加到 refer 那里的 @media 那串东西上去
						mediaAtrule.append(userInMedia);
					// Else 就简单多了,直接循环拷贝 delcs
					} else {
						_.forEach(rule.nodes, function (node) {
							var clone = node.clone();
							clone.raws.before = node.raws.before;
							clone.raws.after = node.raws.after;
							clone.raws.between = node.raws.between;
							atRuleParent.append(clone);
						});
					}
					atRule.remove();
					matchAtRule = true;
					// 组合模式
				} else if (opts.refMod === 'group') {
					// 目标选择器
					var targetSelector = rule.selector;
					var userSelector = atRuleParent.selector;

					// 目前选择器作为数组
					var targetSelectors = [targetSelector];

					// 将使用的选择器与目标选择器合成为选择器数组
					targetSelectors.push(userSelector);

					// 更新到原来的选择器上
					rule.selectors = targetSelectors;
					atRule.remove();
					matchAtRule = true;
					// 报错
				} else {
					throw new Error('Decls-ref: option `refMod` is not correct!');
				}
			});

			if (!matchAtRule) {
				// Version2: result.warn('\'' + atRule.params + '\' is not defined!');
				log('Decls-ref:', gutil.colors.red(selector), 'is not define!');
			}
		});
	};
});

// Log for debug.
function debug() {
	var data = Array.prototype.slice.call(arguments);
	gutil.log.apply(false, data);
}

// Log for output msg.
function log() {
	var data = Array.prototype.slice.call(arguments);
	gutil.log.apply(false, data);
}
