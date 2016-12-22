export default function (babel) {
    const { types: t } = babel;

    return {
        visitor: {
            FunctionDeclaration(path) {
                try {
                    if (path.node.id.name === "_interopRequireDefault") {
                        path.remove();
                    }
                } catch(e) {}
            },

            VariableDeclaration(path) {
                try {
                    if (path.node.declarations[0].init.callee.name == "_interopRequireDefault") {
                        var dec = path.node.declarations[0];
                        var name = dec.id.name;
                        var nameParts = /(.+)(\d+)$/.exec(name);
                        var num = nameParts[2] - 1 < 2 ? "" : nameParts[2] - 1;
                        var id = nameParts[1] + num;

                        path.scope.path.traverse({
                            MemberExpression(path2) {
                                if (path2.node.object.name === name && path2.node.property.name === "default") {
                                    path2.replaceWith(
                                        t.Identifier(id)
                                    );
                                }
                            }
                        });

                        path.remove();
                    }
                } catch(e) {}
            }
        }
    };
}



