BEGIN;

-- Grant SELECT to anon on properties
GRANT SELECT ON public.properties TO anon, authenticated;

-- Grant table-level permissions to authenticated (actual row access is strictly controlled by Row Level Security)
GRANT SELECT ON public.wallets TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.property_managers TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.leases TO authenticated;
GRANT SELECT, INSERT ON public.rent_payments TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.maintenance_requests TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.work_orders TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.accounting_ledger TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.kyc_approvals TO authenticated;
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT SELECT ON public.invitation_rate_limits TO authenticated;
GRANT SELECT ON public.holdings TO authenticated;
GRANT SELECT ON public.transactions TO authenticated;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

COMMIT;
