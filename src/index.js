export default function (babel) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      FunctionDeclaration(path) {
        if (path.node.id.name === "_interopRequireDefault") {
          path.remove();
        }
      },
      
      VariableDeclaration(path) {
        try {
          if (path.node.declarations[0].init.callee.name == "_interopRequireDefault") {
            var dec = path.node.declarations[0];
            var name = dec.id.name;
            var id = name.slice(0, -1);
            if (/2$/.test(dec.id.name)) {
              path.scope.path.traverse({
                MemberExpression(path2) {
                  if (path2.node.object.name === name && path2.node.property.name === "default") {
                    path2.replaceWith(
                      t.Identifier(id)
                    );
                  }
                }
              });
            }
            path.remove();
          }
        } catch(e) {}
      }
    }
  };
}
