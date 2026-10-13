
const express = require('express');

const Jadwal_groomersService = require('../services/jadwal_groomers');
const Jadwal_groomersDBApi = require('../db/api/jadwal_groomers');
const wrapAsync = require('../helpers').wrapAsync;


const router = express.Router();

const { parse } = require('json2csv');


const {
    checkCrudPermissions,
} = require('../middlewares/check-permissions');

router.use(checkCrudPermissions('jadwal_groomers'));


/**
 *  @swagger
 *  components:
 *    schemas:
 *      Jadwal_groomers:
 *        type: object
 *        properties:
 
 *          jam_mulai:
 *            type: string
 *            default: jam_mulai
 *          jam_selesai:
 *            type: string
 *            default: jam_selesai
 *          jam_istirahat_mulai:
 *            type: string
 *            default: jam_istirahat_mulai
 *          jam_istirahat_selesai:
 *            type: string
 *            default: jam_istirahat_selesai
 
 *          kapasitas_slot:
 *            type: integer
 *            format: int64
 
 
 *          
 */

/**
 *  @swagger
 * tags:
 *   name: Jadwal_groomers
 *   description: The Jadwal_groomers managing API
 */

/**
*  @swagger
*  /api/jadwal_groomers:
*    post:
*      security:
*        - bearerAuth: []
*      tags: [Jadwal_groomers]
*      summary: Add new item
*      description: Add new item
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              properties:
*                data:
*                  description: Data of the updated item
*                  type: object
*                  $ref: "#/components/schemas/Jadwal_groomers"
*      responses:
*        200:
*          description: The item was successfully added
*          content:
*            application/json:
*              schema:
*                $ref: "#/components/schemas/Jadwal_groomers"
*        401:
*          $ref: "#/components/responses/UnauthorizedError"
*        405:
*          description: Invalid input data
*        500:
*          description: Some server error
*/
router.post('/', wrapAsync(async (req, res) => {
    const referer = req.headers.referer || `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await Jadwal_groomersService.create(req.body.data, req.currentUser, true, link.host);
    const payload = true;
    res.status(200).send(payload);
}));

/**
 * @swagger
 * /api/budgets/bulk-import:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [Jadwal_groomers]
 *    summary: Bulk import items
 *    description: Bulk import items
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          properties:
 *            data:
 *              description: Data of the updated items
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Jadwal_groomers"
 *    responses:
 *      200:
 *        description: The items were successfully imported
 *    content:
 *      application/json:
 *        schema:
 *          $ref: "#/components/schemas/Jadwal_groomers"
 *      401:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      405:
 *        description: Invalid input data
 *      500:
 *        description: Some server error
 *
 */
router.post('/bulk-import', wrapAsync(async (req, res) => {
    const referer = req.headers.referer || `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await Jadwal_groomersService.bulkImport(req, res, true, link.host);
    const payload = true;
    res.status(200).send(payload);
}));

/**
  *  @swagger
  *  /api/jadwal_groomers/{id}:
  *    put:
  *      security:
  *        - bearerAuth: []
  *      tags: [Jadwal_groomers]
  *      summary: Update the data of the selected item
  *      description: Update the data of the selected item
  *      parameters:
  *        - in: path
  *          name: id
  *          description: Item ID to update
  *          required: true
  *          schema:
  *            type: string
  *      requestBody:
  *        description: Set new item data
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              properties:
  *                id:
  *                  description: ID of the updated item
  *                  type: string
  *                data:
  *                  description: Data of the updated item
  *                  type: object
  *                  $ref: "#/components/schemas/Jadwal_groomers"
  *              required:
  *                - id
  *      responses:
  *        200:
  *          description: The item data was successfully updated
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Jadwal_groomers"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */
router.put('/:id', wrapAsync(async (req, res) => {
  await Jadwal_groomersService.update(req.body.data, req.body.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

/**
  * @swagger
  *  /api/jadwal_groomers/{id}:
  *    delete:
  *      security:
  *        - bearerAuth: []
  *      tags: [Jadwal_groomers]
  *      summary: Delete the selected item
  *      description: Delete the selected item
  *      parameters:
  *        - in: path
  *          name: id
  *          description: Item ID to delete
  *          required: true
  *          schema:
  *            type: string
  *      responses:
  *        200:
  *          description: The item was successfully deleted
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Jadwal_groomers"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */
router.delete('/:id', wrapAsync(async (req, res) => {
  await Jadwal_groomersService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

/**
  *  @swagger
  *  /api/jadwal_groomers/deleteByIds:
  *    post:
  *      security:
  *        - bearerAuth: []
  *      tags: [Jadwal_groomers]
  *      summary: Delete the selected item list
  *      description: Delete the selected item list
  *      requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              properties:
  *                ids:
  *                  description: IDs of the updated items
  *                  type: array
  *      responses:
  *        200:
  *          description: The items was successfully deleted
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Jadwal_groomers"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Items not found
  *        500:
  *          description: Some server error
  */
router.post('/deleteByIds', wrapAsync(async (req, res) => {
    await Jadwal_groomersService.deleteByIds(req.body.data, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }));

/**
  *  @swagger
  *  /api/jadwal_groomers:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Jadwal_groomers]
  *      summary: Get all jadwal_groomers
  *      description: Get all jadwal_groomers
  *      responses:
  *        200:
  *          description: Jadwal_groomers list successfully received
  *          content:
  *            application/json:
  *              schema:
  *                type: array
  *                items:
  *                  $ref: "#/components/schemas/Jadwal_groomers"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Data not found
  *        500:
  *          description: Some server error
*/
router.get('/', wrapAsync(async (req, res) => {
  const filetype = req.query.filetype
  
  const currentUser = req.currentUser;
  const payload = await Jadwal_groomersDBApi.findAll(
    req.query,  { currentUser }
  );
  if (filetype && filetype === 'csv') {
    const fields = ['id','jam_mulai','jam_selesai','jam_istirahat_mulai','jam_istirahat_selesai',
        'kapasitas_slot',
        
      
        ];
    const opts = { fields };
    try {
      const csv = parse(payload.rows, opts);
      res.status(200).attachment(csv);
      res.send(csv)

    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(200).send(payload);
  }

}));

/**
 *  @swagger
 *  /api/jadwal_groomers/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Jadwal_groomers]
 *      summary: Count all jadwal_groomers
 *      description: Count all jadwal_groomers
 *      responses:
 *        200:
 *          description: Jadwal_groomers count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Jadwal_groomers"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/count', wrapAsync(async (req, res) => {
  
    const currentUser = req.currentUser;
    const payload = await Jadwal_groomersDBApi.findAll(
        req.query,
         null, 
        { countOnly: true, currentUser }
    );

    res.status(200).send(payload);
}));

/**
 *  @swagger
 *  /api/jadwal_groomers/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Jadwal_groomers]
 *      summary: Find all jadwal_groomers that match search criteria
 *      description: Find all jadwal_groomers that match search criteria
 *      responses:
 *        200:
 *          description: Jadwal_groomers list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Jadwal_groomers"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  
  const payload = await Jadwal_groomersDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
    req.query.offset,
    
  );

  res.status(200).send(payload);
});

/**
  * @swagger
  *  /api/jadwal_groomers/{id}:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Jadwal_groomers]
  *      summary: Get selected item
  *      description: Get selected item
  *      parameters:
  *        - in: path
  *          name: id
  *          description: ID of item to get
  *          required: true
  *          schema:
  *            type: string
  *      responses:
  *        200:
  *          description: Selected item successfully received
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Jadwal_groomers"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */
router.get('/:id', wrapAsync(async (req, res) => {
  const payload = await Jadwal_groomersDBApi.findBy(
    { id: req.params.id },
  );
  
  

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
