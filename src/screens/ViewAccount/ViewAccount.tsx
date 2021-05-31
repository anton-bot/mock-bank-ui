import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<{
  accountId: string;
}>;

export const ViewAccount: React.FC<Props> = (props) => {
  const { accountId } = props.match.params;

  return <div className="ViewAccount">View Account {accountId}</div>;
};
