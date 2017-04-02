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

			// Get the @ref atRule value, which is the selector's rules,
			// May more than one, including @media part.
			root.walkRules(new RegExp(selector), function (rule) {
				// Clone Mod.
				if (opts.refMod === 'clone') {
					// If the target selector is in @media atRule.
					if (rule.parent.type === 'atrule' && rule.parent.name === 'media') {
						var mediaAtRule = rule.parent;

						// Make a copy rule.
						var userInMedia = postcss.rule({
							selector: atRuleParent.selector,
							source: rule.source
						});

						// All the refer decls append to userInMedia.
						_.forEach(rule.nodes, function (node) {
							var clone = node.clone();
							clone.raws.before = node.raws.before;
							clone.raws.after = node.raws.after;
							clone.raws.between = node.raws.between;
							userInMedia.append(clone);
						});

						// Append to mediaAtRule.
						mediaAtRule.append(userInMedia);
					// Else, just make copy delcs.
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
				// Group Mod.
				} else if (opts.refMod === 'group') {
					// Target Selector.
					var targetSelector = rule.selector;
					var userSelector = atRuleParent.selector;

					// Set target as selectors array.
					var targetSelectors = [targetSelector];

					// Push userSelector to target array.
					targetSelectors.push(userSelector);

					// Update to preview selectors.
					rule.selectors = targetSelectors;
					atRule.remove();
					matchAtRule = true;
					// Option wrong setting.
				} else {
					throw new Error('[ postcss-decls-ref ]: option `refMod` is not correct!');
				}
			});

			if (!matchAtRule) {
				// Version2: result.warn('\'' + atRule.params + '\' is not defined!');
				log('Decls-ref:', gutil.colors.red(selector), 'is not define or not in same css contents!');
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
