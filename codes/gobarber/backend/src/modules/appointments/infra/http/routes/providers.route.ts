import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailableController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailableController';
import ProviderDayAvailableController from '@modules/appointments/infra/http/controllers/ProviderDayAvailableController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailableController = new ProviderMonthAvailableController();
const providerDayAvailableController = new ProviderDayAvailableController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailableController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailableController.index,
);

export default providersRouter;
