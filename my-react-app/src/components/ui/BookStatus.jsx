const BookStatus = ({ status }) => {
  const isAvailable = status === 'Available';

  const statusStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: '8px',
    backgroundColor: isAvailable ? '#dfecc6' : '#ffe3e3',
    color: isAvailable ? '#485c11' : '#c92a2a',
  };

  return <span style={statusStyle}>{status}</span>;
};

export default BookStatus;
