module.exports = AwsManyToMany = async (config) => {
  let { product, to_connect, page } = config;

  // to_connect: [[field_name, payload, {}]]

  let promise_all = await to_connect.map(async (table) => {
    console.log(table, "primise_all_tables table");
    let field_name = table[0];
    let all_tables =
      (await table[1]) &&
      table[1].map(async (load) => {
        console.log(load, "primise_all_tables load");
        // if theire is not an id, add it the item before adding
        // many to many. Else add many to many relationships
        if (!load.id) {
        } else {
          // adding many to many

          // get graph
          let got_graph = get_graph(page, { load: field_name });
          // get to many 2 manyt able from the field_name
          let m2m = got_graph.m2m;
          console.log(page, field_name, got_graph, "primise_all_tables props");

          /* 
              many2many expects
              {
                product: product_id, 
                checkbox; checkbox_id
              }
            */

          let input = {
            [m2m.load]: load.id,
            [m2m.focus]: product.id,
          };
          console.log(input, "m2m_input");
          let create_graph = GetAction(m2m.create, "mutations");

          const create = await API.graphql(
            graphqlOperation(create_graph, { input })
          );

          return create;
        }
        return load;
      });
    return all_tables;
  });

  return await Promise.all(promise_all);
};
