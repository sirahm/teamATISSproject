import express from 'express';

import { UserDisplayName } from '../Util';

export function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
}

export function DisplayCreateMCPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
  res.render('index', { title: 'Create Multiple Choice Question', page: 'createMC', displayName:  UserDisplayName(req) });
}

export function DisplayCreateTFPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    res.render('index', { title: 'Create True/False Question', page: 'createTF', displayName: UserDisplayName(req)  });
}

export function DisplayCreateSAPage(req: express.Request, res: express.Response, next: express.NextFunction) 
{
    res.render('index', { title: 'Create Simple Answer Question', page: 'createSA', displayName: UserDisplayName(req)  });
}
