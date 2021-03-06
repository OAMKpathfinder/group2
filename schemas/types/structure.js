const { GraphQLInterfaceType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt } = require("graphql");
const { StructureTypeType, StructureEfficiencyReportType } = require(".");

const StructureType = new GraphQLInterfaceType({
  name: "Structure",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    type: { type: new GraphQLNonNull(StructureTypeType) },
    uValue: { type: new GraphQLNonNull(GraphQLFloat) },
    price: { type: GraphQLFloat },
    manufacturer: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    productionYear: { type: GraphQLInt },
    efficiencyReport: { type: new GraphQLNonNull(StructureEfficiencyReportType) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) }
  }
});

exports.StructureType = StructureType;