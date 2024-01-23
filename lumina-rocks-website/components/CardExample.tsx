import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardExample: React.FC = () => {
  return (
    // <Card style={{ width: '18rem' }}>
    <Card style={{ margin: '1rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card&lsquo;s content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardExample;