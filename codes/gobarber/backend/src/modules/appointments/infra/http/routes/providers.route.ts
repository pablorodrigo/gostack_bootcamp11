import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailableController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailableController.index,
);

export default providersRouter;
