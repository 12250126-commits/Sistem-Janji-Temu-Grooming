
const express = require('express');

const Riwayat_groomingsService = require('../services/riwayat_groomings');
const Riwayat_groomingsDBApi = require('../db/api/riwayat_groomings');
const wrapAsync = require('../helpers').wrapAsync;


const router = express.Router();

const { parse } = require('json2csv');


const {
    checkCrudPermissions,
} = require('../middlewares/check-permissions');

router.use(checkCrudPermissions('riwayat_groomings'));


/**
 *  @swagger
 *  components:
 *    schemas:
 *      Riwayat_groomings:
 *        type: object
 *        properties:
 
 *          catatan_tindakan:
 *            type: string
 *            default: catatan_tindakan
 *          catatan_kondisi:
 *            type: string
 *            default: catatan_kondisi
 
 
 *          berat_kg_setelah:
 *            type: integer
 *            format: int64
 
 *          
 */

/**
 *  @swagger
 * tags:
 *   name: Riwayat_groomings
 *   description: The Riwayat_groomings managing API
 */

/**
*  @swagger
*  /api/riwayat_groomings:
*    post:
*      security:
*        - bearerAuth: []
*      tags: [Riwayat_groomings]
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
*                  $ref: "#/components/schemas/Riwayat_groomings"
*      responses:
*        200:
*          description: The item was successfully added
*          content:
*            application/json:
*              schema:
*                $ref: "#/components/schemas/Riwayat_groomings"
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
    await Riwayat_groomingsService.create(req.body.data, req.currentUser, true, link.host);
    const payload = true;
    res.status(200).send(payload);
}));

/**
 * @swagger
 * /api/budgets/bulk-import:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [Riwayat_groomings]
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
 *                $ref: "#/components/schemas/Riwayat_groomings"
 *    responses:
 *      200:
 *        description: The items were successfully imported
 *    content:
 *      application/json:
 *        schema:
 *          $ref: "#/components/schemas/Riwayat_groomings"
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
    await Riwayat_groomingsService.bulkImport(req, res, true, link.host);
    const payload = true;
    res.status(200).send(payload);
}));

/**
  *  @swagger
  *  /api/riwayat_groomings/{id}:
  *    put:
  *      security:
  *        - bearerAuth: []
  *      tags: [Riwayat_groomings]
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
  *                  $ref: "#/components/schemas/Riwayat_groomings"
  *              required:
  *                - id
  *      responses:
  *        200:
  *          description: The item data was successfully updated
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Riwayat_groomings"
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
  await Riwayat_groomingsService.update(req.body.data, req.body.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

/**
  * @swagger
  *  /api/riwayat_groomings/{id}:
  *    delete:
  *      security:
  *        - bearerAuth: []
  *      tags: [Riwayat_groomings]
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
  *                $ref: "#/components/schemas/Riwayat_groomings"
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
  await Riwayat_groomingsService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

/**
  *  @swagger
  *  /api/riwayat_groomings/deleteByIds:
  *    post:
  *      security:
  *        - bearerAuth: []
  *      tags: [Riwayat_groomings]
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
  *                $ref: "#/components/schemas/Riwayat_groomings"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Items not found
  *        500:
  *          description: Some server error
  */
router.post('/deleteByIds', wrapAsync(async (req, res) => {
    await Riwayat_groomingsService.deleteByIds(req.body.data, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }));

/**
  *  @swagger
  *  /api/riwayat_groomings:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Riwayat_groomings]
  *      summary: Get all riwayat_groomings
  *      description: Get all riwayat_groomings
  *      responses:
  *        200:
  *          description: Riwayat_groomings list successfully received
  *          content:
  *            application/json:
  *              schema:
  *                type: array
  *                items:
  *                  $ref: "#/components/schemas/Riwayat_groomings"
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
  const payload = await Riwayat_groomingsDBApi.findAll(
    req.query,  { currentUser }
  );
  if (filetype && filetype === 'csv') {
    const fields = ['id','catatan_tindakan','catatan_kondisi',
        
        'berat_kg_setelah',
      'mulai_pada','selesai_pada',
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
 *  /api/riwayat_groomings/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Riwayat_groomings]
 *      summary: Count all riwayat_groomings
 *      description: Count all riwayat_groomings
 *      responses:
 *        200:
 *          description: Riwayat_groomings count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Riwayat_groomings"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/count', wrapAsync(async (req, res) => {
  
    const currentUser = req.currentUser;
    const payload = await Riwayat_groomingsDBApi.findAll(
        req.query,
         null, 
        { countOnly: true, currentUser }
    );

    res.status(200).send(payload);
}));

/**
 *  @swagger
 *  /api/riwayat_groomings/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Riwayat_groomings]
 *      summary: Find all riwayat_groomings that match search criteria
 *      description: Find all riwayat_groomings that match search criteria
 *      responses:
 *        200:
 *          description: Riwayat_groomings list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Riwayat_groomings"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  
  const payload = await Riwayat_groomingsDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
    req.query.offset,
    
  );

  res.status(200).send(payload);
});

/**
  * @swagger
  *  /api/riwayat_groomings/{id}:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Riwayat_groomings]
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
  *                $ref: "#/components/schemas/Riwayat_groomings"
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
  const payload = await Riwayat_groomingsDBApi.findBy(
    { id: req.params.id },
  );
  
  

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
