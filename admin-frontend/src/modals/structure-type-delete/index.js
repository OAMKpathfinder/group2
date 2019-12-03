import React from "react";
import GraphQLClient from '../../providers/graphql';
import { AppToaster } from '../../App';
import { Button, Intent, Dialog, Classes, Colors } from "@blueprintjs/core";

class StructureTypeDeleteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
      isLoading: false,
      values: {
        typeId: props.selectedStructureTypeId || ""
      },
      errors: {},
      typesList: [ { label: "Choose an item...", value: "" } ]
    };

    if(props.structureTypes) {
      props.structureTypes.forEach(structureType => {
        this.state.typesList.push({ label: structureType.title, value: structureType.id });
      });
    }

    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, errors: {} });
      GraphQLClient.request(`
      mutation($id: ID!) {
        deleteStructureType(id: $title)
      }
    `, this.props.structureType.id)
        .then(data => {
          AppToaster.show({ icon: "tick", intent: Intent.SUCCESS, message: "Successfully deleted the structure type \""+this.props.structureType.title+"\"!" });
          resolve(data);
        })
        .catch(err => {
          let msg = (err.response) ? err.response.errors[0].message : err.message;
          AppToaster.show({ icon: "disable", intent: Intent.DANGER, message: msg });
          // reject(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  render() {
    return (
      <Dialog
        className="StructureTypeDeleteModal Modal"
        icon="new-layers"
        onOpening={this.reset}
        onClose={this.props.onClose || undefined}
        title={"Delete Structure Type"}
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>
            Are you sure you want to delete the structure type "{this.props.structureType.title}" permanently?
            <br/><br/>
            <strong style={{ color: Colors.RED4 }}>Warning: </strong> All templates of this type get removed too.
          </p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              onClick={this.props.onClose || undefined}
              disabled={this.state.isLoading}
            >Cancel</Button>
            <Button
              intent={Intent.DANGER}
              onClick={this.handleSubmit}
              loading={this.state.isLoading}
            >Confirm</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default StructureTypeDeleteModal;