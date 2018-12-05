var selectQuery = "select * from bh_author_post_detail limit 10";

var getAllPhotosGallery ="SELECT p.ID,p.post_date,p.post_title,p.post_content,group_concat(t.name),t.slug ,p.guid as images "+
"FROM wp_terms t,wp_term_taxonomy tt, wp_term_relationships tr ,wp_posts p "+
" WHERE p.ID = tr.object_id "+
" AND t.term_id = tt.term_id "+
" AND tt.term_taxonomy_id = tr.term_taxonomy_id "+
" AND taxonomy='photo-category'"+
" AND t.slug in('first-look','celeb-wallpapers','movie-wallpapers','movie-stills','on-the-sets','celeb-photos','audio-release','on-the-covers','parties-and-events','fashion-lifestyle')"+
" GROUP BY p.id,p.post_title, t.name "+
" ORDER BY post_date DESC LIMIT 0 ,300";


var getFirstLookPhotosGallery ="SELECT tb2.* "+
"FROM (SELECT *FROM ( "+
              " SELECT wp_posts.*, wp_p2p.* FROM wp_posts "+
                " INNER JOIN wp_term_relationships ON ( wp_posts.ID = wp_term_relationships.object_id AND wp_term_relationships.term_taxonomy_id = 2 ) "+
                " LEFT JOIN wp_p2p ON ( wp_posts.ID = wp_p2p.p2p_from  AND wp_p2p.p2p_type = 'attachment-movie') "+
                " WHERE wp_posts.post_type = 'attachment' "+
                " AND wp_posts.post_mime_type LIKE 'image/%' "+
                " AND wp_posts.post_status = 'inherit' "+
                " AND wp_p2p.p2p_id is NOT NULL "+
                " ORDER BY wp_posts.menu_order DESC, wp_posts.post_date DESC, wp_posts.ID DESC "+
        " ) as tb1 GROUP BY tb1.menu_order, tb1.ID ORDER BY tb1.post_date DESC "+
" ) as tb2 GROUP BY tb2.p2p_to ORDER BY tb2.post_date DESC limit 0,12 ";

var getAllPhotoCategories ="select distinct t.slug,t.term_id "+
" from wp_terms t,wp_posts p ,wp_term_relationships tr,wp_term_taxonomy tt  "+
" where t.term_id = tt.term_id "+
" AND tt.term_taxonomy_id = tr.term_taxonomy_id "+
" AND p.ID = tr.object_id "+
" AND tt.taxonomy = 'photo-category' "+
" order by t.term_id asc ";

/**
 * #all the images of particular movie
 * select p.ID , p.post_title ,p.post_date,t.name,p.guid
FROM wp_posts p, wp_p2p pp, wp_term_relationships tr,wp_terms t,wp_term_taxonomy tt
where p.ID = pp.p2p_from 
and p.ID = tr.object_id 
and pp.p2p_to = 844059
AND t.term_id = tt.term_id 
AND tt.term_taxonomy_id = tr.term_taxonomy_id 
AND tt.taxonomy='photo-category'
AND t.slug ='first-look'
AND p.ID = pp.p2p_from
group by p.ID ORDER BY p.post_date desc
 */



 /***
  * #to get all the latest movies in first look

SELECT tb2.*
        FROM (
                SELECT *
                FROM (
                        SELECT wp_posts.*, wp_p2p.* 
                        FROM wp_posts

                        INNER JOIN wp_term_relationships ON ( wp_posts.ID = wp_term_relationships.object_id AND wp_term_relationships.term_taxonomy_id = 2 )
					
                        LEFT JOIN wp_p2p ON ( wp_posts.ID = wp_p2p.p2p_from  AND wp_p2p.p2p_type = 'attachment-movie')
				
                        WHERE

                        wp_posts.post_type = 'attachment'

                        AND wp_posts.post_mime_type LIKE 'image/%'

                        AND wp_posts.post_status = 'inherit'

                        AND wp_p2p.p2p_id is NOT NULL

                        ORDER BY 
                        wp_posts.menu_order DESC,
                        wp_posts.post_date DESC, wp_posts.ID DESC

                ) as tb1

                GROUP BY tb1.menu_order, tb1.ID
                ORDER BY
              #  tb1.menu_order DESC,
                tb1.post_date DESC

        ) as tb2

        GROUP BY tb2.post_title
        ORDER BY 
      # tb2.menu_order DESC, 
	   tb2.post_date DESC limit 0,12

  */

//var getAllPhotosGallery ="SELECT p.ID,p.post_date,p.post_name,p.post_author,p.post_title,p.post_content,p.post_excerpt,p.guid,tt.taxonomy,t.name,t.slug FROM wp_posts p, wp_terms t,wp_term_taxonomy tt, wp_term_relationships tr WHERE p.ID = tr.object_id AND t.term_id = tt.term_id AND tt.term_taxonomy_id = tr.term_taxonomy_id AND (p.post_status =  'publish'  OR p.post_status =  'private') AND taxonomy='category' GROUP BY p.id, post_title,t.name ORDER BY post_date DESC LIMIT 0 ,30";
// var getAllPhotosGallery = "select w1.ID as parent_ID,w1.post_title as title,w1.post_date,w1.post_excerpt , group_concat(w2.guid) as images from wp_posts w1 left join wp_posts w2 ON w2.post_parent = w1.ID where w2.post_parent IN (SELECT p.ID "+
//     "FROM wp_posts AS p, wp_terms  AS t,wp_term_taxonomy AS tt, wp_term_relationships AS tr "+
//      "WHERE p.ID = tr.object_id AND t.term_id = tt.term_id AND tt.term_taxonomy_id = tr.term_taxonomy_id AND"+ 
//      "(p.post_status = \'publish\' OR p.post_status =\'private\') AND "+
//      "taxonomy='category'  GROUP BY p.ID,p.post_date,t.name ORDER BY p.post_date) group by w2.post_parent DESC limit 0, 10;";



// var getAllPhotosGallery = "select ID,post_title as title,post_date, post_excerpt,guid from wp_posts where post_type=\'attachment\' and "+
// "post_parent in (SELECT p.ID "+
// " FROM wp_posts AS p, wp_terms  AS t,wp_term_taxonomy AS tt, wp_term_relationships AS tr "+
//  " WHERE p.ID = tr.object_id AND t.term_id = tt.term_id AND tt.term_taxonomy_id = tr.term_taxonomy_id AND "+
//  " (p.post_status = \'publish\' OR p.post_status =\'private\') AND "+
//  " taxonomy='category'  GROUP BY p.ID,p.post_date,t.name ORDER BY p.post_date) ORDER BY post_parent DESC LIMIT 0 ,30 ";



//var getAllPhotosGallery = "select ID,post_date,post_title,post_type,guid from wp_posts where post_type='attachment' and post_parent in (SELECT p.ID FROM wp_posts p, wp_terms t,wp_term_taxonomy tt, wp_term_relationships tr WHERE p.ID = tr.object_id AND t.term_id = tt.term_id AND tt.term_taxonomy_id = tr.term_taxonomy_id AND (p.post_status =  'publish' OR p.post_status =  'private') AND taxonomy='category' AND t.slug in('first-look','celeb-wallpapers','movie-wallpapers','movie-stills','on-the-sets','celeb-photos','audio-release','on-the-covers','parties-and-events','fashion-lifestyle') GROUP BY p.id, post_title, post_date ORDER BY post_date) LIMIT 0 ,30";
//var getAllPhotosGallery = "SELECT p.ID,p.post_date,p.post_name,p.post_author,p.post_title,p.post_content,p.post_excerpt,p.guid,tt.taxonomy,t.name, t.term_id,t.slug FROM wp_posts p,wp_terms t,wp_term_taxonomy tt, wp_term_relationships tr WHERE p.ID = tr.object_id AND t.term_id = tt.term_id AND tt.term_taxonomy_id = tr.term_taxonomy_id AND (p.post_status =  'publish' OR p.post_status =  'private') AND taxonomy='category' AND t.slug in('first-look','celeb-wallpapers','movie-wallpapers','movie-stills','on-the-sets','celeb-photos','audio-release','on-the-covers','parties-and-events','fashion-lifestyle') GROUP BY p.id, post_title, post_date ORDER BY post_date DESC LIMIT 0 ,9";
module.exports = {
    selectQuery,
    getAllPhotosGallery,
    getFirstLookPhotosGallery,
    getAllPhotoCategories
}