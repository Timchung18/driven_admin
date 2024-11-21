import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data, error } = await supabase
        .from('tickets') // Replace with your table name
        .select('*');
      
      if (error) console.error('Error fetching tickets:', error);
      else setTickets(data);
      
      setLoading(false);
    };

    fetchTickets();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.ticket_id}>
            {ticket.ticket_number}: {ticket.violation_type} - ${ticket.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsList;
