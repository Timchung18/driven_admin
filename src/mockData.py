import pandas as pd
from faker import Faker
import random
from datetime import datetime, timedelta

# Initialize Faker
fake = Faker()

# Number of mock records to generate
num_tickets = 10
num_installments = 10

# Generate mock data for Tickets
ticket_data = {
    'ticket_id': [i for i in range(1, num_tickets + 1)],
    'user_id': [random.randint(1, 50) for _ in range(num_tickets)],
    'ticket_number': [fake.bothify(text='TKT-####-????') for _ in range(num_tickets)],
    'ticket_issue_date': [fake.date_between(start_date='-1y', end_date='today') for _ in range(num_tickets)],
    'ticket_due_date': [fake.date_between(start_date='today', end_date='+1y') for _ in range(num_tickets)],
    'payment_complete_date': [fake.date_between(start_date='-1y', end_date='today') if random.choice([True, False]) else None for _ in range(num_tickets)],
    'fine_amount': [round(random.uniform(50, 500), 2) for _ in range(num_tickets)],
    'amount_paid': [round(random.uniform(0, 500), 2) for _ in range(num_tickets)],
    'overdue_fine_amount': [round(random.uniform(0, 100), 2) for _ in range(num_tickets)],
    'payment_plan': [random.choice(['full', 'four']) for _ in range(num_tickets)],
    # 'total_installments': [random.choice([0, 4]) for _ in range(num_tickets)],
    'total_installments': [1 for _ in range(num_tickets)],
    # 'completed_installments': [random.randint(0, 4) for _ in range(num_tickets)],
    'completed_installments': [random.randint(0, 1) for _ in range(num_tickets)],
    'city': [fake.city() for _ in range(num_tickets)],
    'state': [fake.state() for _ in range(num_tickets)],
    'zipcode': [fake.zipcode() for _ in range(num_tickets)],
}

# Generate mock data for Installments
installment_data = {
    'installment_id': [i for i in range(1, num_installments + 1)],
    # 'ticket_id': [random.randint(1, num_tickets) for _ in range(num_installments)],
    'ticket_id': [i for i in range(1, num_tickets+1)],
    # 'due_date': [fake.date_between(start_date='-1y', end_date='+1y') for _ in range(num_installments)],
    'completion_date': [fake.date_between(start_date='-1y', end_date='today') if random.choice([True, False]) else None for _ in range(num_installments)],
    'installment_charge_amount': [round(random.uniform(10, 200), 2) for _ in range(num_installments)],
    'is_overdue': [random.choice([True, False]) for _ in range(num_installments)],
    'overdue_charge_amount': [round(random.uniform(0, 50), 2) for _ in range(num_installments)],
    # 'installment_number': [random.randint(1, 4) for _ in range(num_installments)],
    'installment_number': [1 for _ in range(num_installments)],
}

# Create DataFrames
ticket_df = pd.DataFrame(ticket_data)
installment_df = pd.DataFrame(installment_data)

# Save DataFrames to CSV
ticket_df.to_csv('mock_tickets.csv', index=False)
installment_df.to_csv('mock_installments.csv', index=False)

# Join Tickets and Installments tables
joined_df = pd.merge(installment_df, ticket_df, on='ticket_id', how='inner')

# Save joined DataFrame to CSV
joined_df.to_csv('joined_tickets_installments.csv', index=False)

print("CSV files 'mock_tickets.csv', 'mock_installments.csv', and 'joined_tickets_installments.csv' with mock data have been generated.")
