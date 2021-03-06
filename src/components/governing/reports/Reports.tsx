import * as React from "react";
import { RepresentativeReport } from "../../../types";
import { Container } from "@material-ui/core";
import { updateReportsLastRead } from "../../../blockchain/RepresentativesService";
import ReportCard from "./ReportCard";
import ChromiaPageHeader from "../../common/ChromiaPageHeader";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";

interface Props {
  reports: RepresentativeReport[];
}

class Reports extends React.Component<Props> {

  componentDidMount() {
    updateReportsLastRead(Date.now());
  }

  render() {
    return (
      <Container>
        <ChromiaPageHeader text="Reports" />
        {this.props.reports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (store: ApplicationState) => {
  return {
    reports: store.government.reports
  };
};

export default connect(mapStateToProps, null)(Reports);
